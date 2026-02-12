import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AddHabit.css";

const HabitAdd = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = JSON.parse(localStorage.getItem("user"))?.loginId;

  /* =========================
     상태
  ========================= */

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [habitList, setHabitList] = useState([]);
  const [recommendedHabits, setRecommendedHabits] = useState([]);

  const [formData, setFormData] = useState({
    habitId: null,
    habitName: "",
    habitDefinition: "",
    tagId: 0,
    styleId: 0,
    startValue: 0,
    stepValue: 0,
    targetValue: 0,
    unit: "",
  });

  const [editing, setEditing] = useState(false);
  const [joined, setJoined] = useState(false);

  /* =========================
     태그 조회
  ========================= */

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await api.get("/habit/tag", {
          headers: { Authorization: accessToken },
        });

        setTags(data);
        if (data.length) {
          setSelectedTag(data[0].tagId);
          setFormData((prev) => ({ ...prev, tagId: data[0].tagId }));
        }
      } catch (err) {
        console.error("태그 불러오기 실패:", err);
      }
    };

    fetchTags();
  }, [accessToken]);

  /* =========================
     태그별 습관 조회
  ========================= */

  useEffect(() => {
    if (!selectedTag) return;

    const fetchHabitList = async () => {
      try {
        const { data } = await api.get("/habit/", {
          headers: { Authorization: accessToken },
          params: { tagId: selectedTag },
        });

        setHabitList(
          (data.habits || []).map((h) => ({
            ...h,
            tagId: data.tagId,
          }))
        );
      } catch (err) {
        console.error("습관 리스트 불러오기 실패:", err);
        setHabitList([]);
      }
    };

    fetchHabitList();
  }, [selectedTag, accessToken]);

  /* =========================
     추천 습관
  ========================= */

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const { data } = await api.get("/ai/recommend/habit", {
          headers: { Authorization: accessToken },
          params: { userId },
        });

        setRecommendedHabits(data.recommendedHabits || []);
      } catch (err) {
        console.error("추천 습관 불러오기 실패:", err);
        setRecommendedHabits([]);
      }
    };

    fetchRecommended();
  }, [userId, accessToken]);

  /* =========================
     핸들러
  ========================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);
    setFormData((prev) => ({ ...prev, tagId }));
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        tagId: formData.tagId,
        styleId: formData.styleId,
        habitName: formData.habitName,
        habitDefinition: formData.habitDefinition,
        startValue: Number(formData.startValue),
        stepValue: Number(formData.stepValue),
        targetValue: Number(formData.targetValue),
        unit: formData.unit,
      };

      const { data } = await api.post("/habit/create", body, {
        headers: { Authorization: accessToken },
      });

      alert(`습관 생성 완료: ${data.message}`);
      setEditing(false);
    } catch (err) {
      console.error("습관 생성 실패:", err);
      alert("습관 생성 실패");
    }
  };

  const handleSelectHabit = (habit) => {
    setFormData({
      habitId: habit.habitId,
      habitName: habit.habitName,
      habitDefinition: habit.habitDefinition,
      tagId: habit.tagId,
      styleId: habit.styleId,
      startValue: habit.startValue,
      stepValue: habit.stepValue,
      targetValue: habit.targetValue,
      unit: habit.unit,
    });

    setEditing(true);
    setJoined(habit.joined);
  };

  const handleJoinHabit = async () => {
    if (!formData.habitId) return;

    try {
      const { data } = await api.post(
        `/habit/${formData.habitId}/join`,
        {},
        { headers: { Authorization: accessToken } }
      );
      alert(data.message);
      setJoined(true);
    } catch (err) {
      console.error("참여 실패:", err);
      alert("참여 실패");
    }
  };

  const handleCancelJoin = async () => {
    if (!formData.habitId) return;

    try {
      await api.delete(`/habit/${formData.habitId}/join`, {
        headers: { Authorization: accessToken },
      });
      alert("참여 취소 완료");
      setJoined(false);
    } catch (err) {
      console.error("참여 취소 실패:", err);
      alert("참여 취소 실패");
    }
  };

  const handleUpdateHabit = async () => {
    if (!formData.habitId) return;

    try {
      await api.patch(
        `/habit/${formData.habitId}/join`,
        { status: "미시작" },
        { headers: { Authorization: accessToken } }
      );
      alert("습관 수정 완료");
    } catch (err) {
      console.error("습관 수정 실패:", err);
      alert("습관 수정 실패");
    }
  };

  /* =========================
     JSX
  ========================= */

  return (
    <div className="habit-page">
      <div className="habit-container">

        {/* ===== 왼쪽: 추천 + 리스트 ===== */}
        <div className="habit-card">
          <h2 className="habit-card-title">추천 습관</h2>

          <div className="habit-list">
            {recommendedHabits.length ? (
              recommendedHabits.map((h, i) => (
                <div
                  key={i}
                  className="habit-list-item"
                  onClick={() => handleSelectHabit(h)}
                >
                  <div className="habit-list-top">
                    <span className="habit-list-name">{h.habitName}</span>
                    <span className="habit-list-tag">{h.tagName}</span>
                  </div>

                  <p className="habit-list-desc">{h.habitDefinition}</p>

                  {h.recommendedMissions?.map((m, j) => (
                    <div key={j} className="habit-recommended-mission">
                      <strong>{m.missionName}</strong> : {m.missionDefinition} ({m.levelName})
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>추천 습관이 없습니다.</p>
            )}
          </div>

          <h2 className="habit-card-title" style={{ marginTop: "40px" }}>
            선택한 태그 습관
          </h2>

          <div className="habit-list">
            {habitList.length ? (
              habitList.map((h) => (
                <div
                  key={h.habitId}
                  className="habit-list-item"
                  onClick={() => handleSelectHabit(h)}
                >
                  <div className="habit-list-top">
                    <span className="habit-list-name">{h.habitName}</span>
                  </div>

                  <p className="habit-list-desc">{h.habitDefinition}</p>
                  <span className="habit-list-status">{h.myStatus}</span>
                </div>
              ))
            ) : (
              <p>선택한 태그에 습관이 없습니다.</p>
            )}
          </div>
        </div>

        {/* ===== 오른쪽: 폼 ===== */}
        <div className="habit-card">
          <h2 className="habit-card-title">
            {editing ? "습관 수정" : "새 습관 만들기"}
          </h2>

          <form
            className="habit-form"
            onSubmit={editing ? (e) => e.preventDefault() : handleCreateHabit}
          >
            <div className="habit-form-group">
              <label>습관 이름</label>
              <input
                type="text"
                name="habitName"
                value={formData.habitName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="habit-form-group">
              <label>태그 선택</label>
              <select
                value={formData.tagId}
                onChange={(e) => handleTagChange(Number(e.target.value))}
              >
                {tags.map((t) => (
                  <option key={t.tagId} value={t.tagId}>
                    {t.tagName}
                  </option>
                ))}
              </select>
            </div>

            <div className="habit-form-group">
              <label>설명</label>
              <textarea
                name="habitDefinition"
                value={formData.habitDefinition}
                onChange={handleInputChange}
              />
            </div>

            <div className="habit-form-group">
              <label>시작값</label>
              <input
                type="number"
                name="startValue"
                value={formData.startValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="habit-form-group">
              <label>단계값</label>
              <input
                type="number"
                name="stepValue"
                value={formData.stepValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="habit-form-group">
              <label>목표값</label>
              <input
                type="number"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="habit-form-group">
              <label>단위</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </div>

            <div className="habit-form-actions">
              {!editing && (
                <button type="submit" className="habit-btn-primary">
                  습관 생성
                </button>
              )}

              {editing && (
                <>
                  <button
                    type="button"
                    className="habit-btn-primary"
                    onClick={handleJoinHabit}
                    disabled={joined}
                  >
                    참여
                  </button>

                  <button
                    type="button"
                    className="habit-btn-secondary"
                    onClick={handleCancelJoin}
                    disabled={!joined}
                  >
                    참여 취소
                  </button>

                  <button
                    type="button"
                    className="habit-btn-primary"
                    onClick={handleUpdateHabit}
                  >
                    수정
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default HabitAdd;
