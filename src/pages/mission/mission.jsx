import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./mission.css";
import { useNavigate } from "react-router-dom";

const Mission = () => {
  // ================= 공통 Authorization =================
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const authConfig = {
    headers: {
      Authorization: token,
    },
  };

  // ================= 상태 =================
  const [tagList, setTagList] = useState([]);
  const [habitList, setHabitList] = useState([]);
  const [modeList, setModeList] = useState([]);
  const [levelList, setLevelList] = useState([]);

  const [selectedTagId, setSelectedTagId] = useState("");

  const [missionList, setMissionList] = useState([]);
  const [recommendedMissions, setRecommendedMissions] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingMissionId, setEditingMissionId] = useState(null);

  const [customMission, setCustomMission] = useState({
    habitId: "",
    modeId: "",
    levelId: "",
    missionName: "",
    missionDefinition: ""
  });

  // ================= 태그 조회 =================
  const fetchTags = async () => {
    try {
      const { data } = await api.get("/habit/tag", authConfig);
      setTagList(data);
    } catch (err) {
      console.error("태그 조회 실패", err);
    }
  };

  // ================= 태그별 습관 조회 =================
  const fetchHabitsByTag = async (tagId) => {
    try {
      const { data } = await api.get("/habit/", {
        ...authConfig,
        params: { tagId },
      });
      setHabitList(data.habits);
    } catch (err) {
      console.error("습관 조회 실패", err);
    }
  };

  // ================= 추천 미션 조회 =================
  const fetchRecommendedMissions = async (habitId) => {
    try {
      if (!habitId) return;

      const user = JSON.parse(localStorage.getItem("user"));

      const { data } = await api.get("/ai/recommend/mission", {
        ...authConfig,
        params: {
          habitId: habitId,
          userId: user.loginId
        }
      });

      setRecommendedMissions(data.missions || []);
    } catch (err) {
      console.error("추천 미션 조회 실패", err);
    }
  };

  // ================= 모드 조회 =================
  const fetchModes = async () => {
    try {
      const { data } = await api.get("/mode", authConfig);
      setModeList(data);
    } catch (err) {
      console.error("모드 조회 실패", err);
    }
  };

  // ================= 레벨 조회 =================
  const fetchLevels = async () => {
    try {
      const { data } = await api.get("/levels", authConfig);
      setLevelList(data);
    } catch (err) {
      console.error("레벨 조회 실패", err);
    }
  };

  // ================= 미션 목록 =================
  const fetchMissions = async () => {
    try {
      const { data } = await api.get("/missions/list", authConfig);
      setMissionList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("미션 목록 조회 실패", err);
    }
  };

  // ================= 검색 =================
  const handleSearch = async (e) => {
    if (e.key !== "Enter") return;
    try {
      const { data } = await api.get("/missions/search", {
        ...authConfig,
        params: { keyword: searchKeyword },
      });
      setMissionList(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("검색 실패", err);
    }
  };

  // ================= 등록 =================
  const handleRegister = async () => {
    try {
      await api.post("/missions/register", customMission, authConfig);
      alert("등록 완료");
      resetForm();
      fetchMissions();
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  // ================= 수정 =================
  const handleUpdate = async () => {
    try {
      await api.put(
        `/missions/update/${editingMissionId}`,
        customMission,
        authConfig
      );
      alert("수정 완료");
      resetForm();
      fetchMissions();
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  // ================= 삭제 =================
  const handleDelete = async (missionId) => {
    try {
      await api.delete(`/missions/delete/${missionId}`, authConfig);
      alert("삭제 완료");
      fetchMissions();
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  const startEdit = (mission) => {
    setEditingMissionId(mission.missionId);
    setCustomMission({
      habitId: mission.habitId,
      modeId: mission.modeId,
      levelId: mission.levelId,
      missionName: mission.missionName,
      missionDefinition: mission.missionDefinition
    });
  };

  const resetForm = () => {
    setEditingMissionId(null);
    setCustomMission({
      habitId: "",
      modeId: "",
      levelId: "",
      missionName: "",
      missionDefinition: ""
    });
  };

  const handleRecommendedClick = (mission) => {
    setEditingMissionId(null);
    setCustomMission({
      habitId: mission.habitId,
      modeId: mission.modeId,
      levelId: mission.levelId,
      missionName: mission.missionName,
      missionDefinition: mission.missionDefinition,
    });
  };

  const handleMissionClick = (missionId) => {
    navigate(`/review?id=${missionId}`);
  };

  // ================= 초기 로딩 =================
  useEffect(() => {
    fetchTags();
    fetchModes();
    fetchLevels();
    fetchMissions();
  }, []);

  return (
    <div className="page-background">
      <div className="main-layout">

        {/* ===== 왼쪽: 추천 + 내 미션 ===== */}
        <div className="section-card left-section">

          <h2>추천 미션</h2>
          {recommendedMissions.length === 0 && (
            <p>습관을 선택하면 추천 미션이 표시됩니다.</p>
          )}
          {recommendedMissions.map((mission, index) => (
            <div key={index} className="mission-item recommended" onClick={() => handleRecommendedClick(mission)} style={{cursor: "pointer"}}>
              <h4>{mission.missionName}</h4>
              <p>{mission.missionDefinition}</p>
              <small>권장 레벨: {mission.levelName}</small>
            </div>
          ))}

          <hr />

          <h2>내 미션 목록</h2>

          <input
            placeholder="검색 후 Enter"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />

          {missionList.map((mission) => (
            <div key={mission.missionId} className="mission-item">
              <h4>{mission.missionName}</h4>
              <p>{mission.missionDefinition}</p>
              <button onClick={() => startEdit(mission)}>수정</button>
              <button onClick={() => handleDelete(mission.missionId)}>
                삭제
              </button>
              <button onClick={() => handleMissionClick(mission.missionId)}>
                댓글로 이동
              </button>
            </div>
          ))}
        </div>

        {/* ===== 오른쪽: 등록/수정 ===== */}
        <div className="section-card right-section">
          <h2>{editingMissionId ? "미션 수정" : "미션 등록"}</h2>

          <select
            value={selectedTagId}
            onChange={(e) => {
              const tagId = Number(e.target.value);
              setSelectedTagId(tagId);
              fetchHabitsByTag(tagId);
            }}
          >
            <option value="">태그 선택</option>
            {tagList.map((tag) => (
              <option key={tag.tagId} value={tag.tagId}>
                {tag.tagName}
              </option>
            ))}
          </select>

          <select
            value={customMission.habitId}
            onChange={(e) => {
              const habitId = Number(e.target.value);
              setCustomMission({
                ...customMission,
                habitId: habitId
              });
              fetchRecommendedMissions(habitId);
            }}
          >
            <option value="">습관 선택</option>
            {habitList.map((habit) => (
              <option key={habit.habitId} value={habit.habitId}>
                {habit.habitName}
              </option>
            ))}
          </select>

          <select
            value={customMission.modeId}
            onChange={(e) =>
              setCustomMission({
                ...customMission,
                modeId: Number(e.target.value)
              })
            }
          >
            <option value="">모드 선택</option>
            {modeList.map((mode) => (
              <option key={mode.modeId} value={mode.modeId}>
                {mode.modeName}
              </option>
            ))}
          </select>

          <select
            value={customMission.levelId}
            onChange={(e) =>
              setCustomMission({
                ...customMission,
                levelId: Number(e.target.value)
              })
            }
            disabled={
              !customMission.modeId || modeList.find((m) => m.modeId === customMission.modeId)?.modeName !== "자율 선택"
            }
          >
            <option value="">레벨 선택</option>
            {levelList.map((level) => (
              <option key={level.levelId} value={level.levelId}>
                {level.levelName}
              </option>
            ))}
          </select>

          <input
            placeholder="미션 이름"
            value={customMission.missionName}
            onChange={(e) =>
              setCustomMission({
                ...customMission,
                missionName: e.target.value
              })
            }
          />

          <textarea
            placeholder="미션 설명"
            value={customMission.missionDefinition}
            onChange={(e) =>
              setCustomMission({
                ...customMission,
                missionDefinition: e.target.value
              })
            }
          />

          {editingMissionId ? (
            <>
              <button onClick={handleUpdate}>수정 완료</button>
              <button onClick={resetForm}>취소</button>
            </>
          ) : (
            <button onClick={handleRegister}>등록</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Mission;
