const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);

/* ===========================
   🔐 로그인 API
=========================== */
server.post("/api/auth/login", (req, res) => {
  const { id, password } = req.body;

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const user = db.users.find(
    (u) => u.loginId === id && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "아이디 또는 비밀번호가 올바르지 않습니다."
    });
  }

  const accessToken = `mock-token-${user.id}-${Date.now()}`;

  res.json({
    accessToken,
    userId: user.id,
    loginId: user.loginId,
    name: user.name
  });
});

/* ===========================
   ✨ 회원가입 API
=========================== */
server.post("/users/signUp", (req, res) => {
  const { loginId, name, password, job, interest } = req.body;

  if (!loginId || !name || !password) {
    return res.status(400).json({
      message: "필수 항목이 누락되었습니다."
    });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));

  const isDuplicate = db.users.some(
    (user) => user.loginId === loginId
  );

  if (isDuplicate) {
    return res.status(409).json({
      message: "이미 사용 중인 ID입니다."
    });
  }

  const newUser = {
    id: Date.now(),
    loginId,
    password,
    name,
    job: job || "",
    interest: interest || ""
  };

  db.users.push(newUser);
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  return res.status(201).json({
    message: "회원가입이 완료되었습니다."
  });
});

/* ===========================
   🔍 비밀번호 찾기
=========================== */
server.post("/users/findPassword", (req, res) => {
  const { loginId, name } = req.body;

  if (!loginId || !name) {
    return res.status(400).json({
      message: "ID와 이름을 입력해주세요.",
    });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const user = db.users.find(
    (u) => u.loginId === loginId && u.name === name
  );

  if (!user) {
    return res.status(404).json({
      message: "사용자 정보를 찾을 수 없습니다.",
    });
  }

  res.json({
    message: "사용자 확인 완료",
  });
});


/* ===========================
   🔑 비밀번호 재설정
=========================== */
server.put("/users/resetPassword", (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({
      message: "ID와 비밀번호는 필수입니다.",
    });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const userIndex = db.users.findIndex(
    (u) => u.loginId === loginId
  );

  if (userIndex === -1) {
    return res.status(404).json({
      message: "사용자를 찾을 수 없습니다.",
    });
  }

  db.users[userIndex].password = password;
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.json({ message: "비밀번호가 변경되었습니다." });
});


/* ===========================
   🔐 토큰 파싱 유틸
=========================== */
const getUserIdFromToken = (req) => {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const token = auth.replace("Bearer ", "");
  const parts = token.split("-");

  if (parts.length < 3) return null;
  return Number(parts[2]);
};

/* ===========================
   👤 내 정보 조회
=========================== */
server.get("/users/me", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

/* ===========================
   ✏️ 내 정보 수정
=========================== */
server.put("/users/me", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  const { name, password, job, interest } = req.body;

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const userIndex = db.users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  if (name !== undefined) db.users[userIndex].name = name;
  if (password !== undefined) db.users[userIndex].password = password;
  if (job !== undefined) db.users[userIndex].job = job;
  if (interest !== undefined) db.users[userIndex].interest = interest;

  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.json({ message: "회원 정보가 수정되었습니다." });
});

/* ===========================
   📊 사용자 기록 조회
=========================== */
server.get("/users/record", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const record = db.records.find((r) => r.userId === userId);

  if (!record) {
    return res.json({
      streakDays: 0,
      completedMissions: 0,
      topTags: []
    });
  }

  res.json({
    streakDays: record.streakDays,
    completedMissions: record.completedMissions,
    topTags: record.topTags
  });
});

/* ===========================
   🏆 내 트로피 조회
=========================== */
server.get("/api/trophies", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const trophies = db.trophies.filter(
    (trophy) => trophy.userId === userId
  );

  res.json(trophies);
});

/* ===========================
   🗑 회원 탈퇴
=========================== */
server.delete("/users/me", (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const newUsers = db.users.filter((u) => u.id !== userId);

  if (newUsers.length === db.users.length) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  db.users = newUsers;
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  res.json({ message: "회원 탈퇴가 완료되었습니다." });
});

/* ===========================
   기본 REST API
=========================== */
server.use(router);

const PORT = 8888;
server.listen(PORT, () => {
  console.log(`🚀 Mock server running at http://localhost:${PORT}`);
});
