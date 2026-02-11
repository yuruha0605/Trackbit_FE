import { useEffect, useState } from "react";
import "./UpdateUser.css";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UpdateUser() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [form, setForm] = useState({
    userId: "",
    userName: "",
    userPassword: "",
    userJob: "",
    userInterest: "",
    profilePublic: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        setForm({
          userId: res.data.userId,
          userName: res.data.userName || "",
          userPassword: "",
          userJob: res.data.userJob || "",
          userInterest: res.data.userInterest || "",
          profilePublic: res.data.profilePublic ?? true,
        });
      } catch {
        setError("사용자 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const body = {
        userName: form.userName,
        userJob: form.userJob,
        userInterest: form.userInterest,
        profilePublic: form.profilePublic,
      };

      if (form.userPassword) {
        body.userPassword = form.userPassword;
      }

      await api.put("/user/me", body, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...storedUser,
        userName: form.userName,
        userJob: form.userJob,
        userInterest: form.userInterest,
        profilePublic: form.profilePublic,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      login(updatedUser);

      alert("정보가 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      setError(err.response?.data?.message || "정보 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) return;

    try {
      await api.delete("/user/me", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      logout();
      navigate("/");
    } catch {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="update-user">
      <form onSubmit={handleSubmit}>
        <header className="mypage-header">
          <span className="mypage-subtitle">Account</span>
          <h1 className="mypage-title">내 정보 수정</h1>
        </header>

        {error && <p className="error-text">{error}</p>}

        <div className="form-grid">
          <div className="form-field">
            <label>ID</label>
            <input value={form.userId} disabled />
          </div>

          <div className="form-field">
            <label>Name</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="userPassword"
              value={form.userPassword}
              onChange={handleChange}
              placeholder="변경 시에만 입력"
            />
          </div>

          <div className="form-field">
            <label>Job</label>
            <input
              name="userJob"
              value={form.userJob}
              onChange={handleChange}
            />
          </div>

          <div className="form-field full">
            <label>Interest</label>
            <input
              name="userInterest"
              value={form.userInterest}
              onChange={handleChange}
            />
          </div>

          <div className="form-field full">
            <label>
              <input
                type="checkbox"
                name="profilePublic"
                checked={form.profilePublic}
                onChange={handleChange}
              />
              프로필 공개
            </label>
          </div>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
          >
            회원 탈퇴
          </button>

          <button type="submit" className="btn-primary">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
