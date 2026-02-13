import { useEffect, useState } from "react";
import './Report.css';
import api from "../../api/axios.js";

const Report = () => {
  const [month, setMonth] = useState(""); // YYYY-MM 형식 입력
  const [monthTagCounts, setMonthTagCounts] = useState({});
  const [habitProgressList, setHabitProgressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    if (!month) return;
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/mypage/report", {
        params: { month },
        headers: { Authorization: localStorage.getItem("accessToken") }
      });

      setMonthTagCounts(res.data.monthTagCounts || {});
      setHabitProgressList(res.data.habitProgressList || []);
    } catch (err) {
      console.error("리포트 조회 실패:", err);
      setError("리포트를 불러오지 못했습니다.");
      setMonthTagCounts({});
      setHabitProgressList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      {/* 월 선택 폼 */}
      <div className="header-section">
        <div className="title-box">이번 달의 미션 결과입니다</div>

        <div className="month-form">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <button type="button" onClick={fetchReport}>조회</button>
        </div>

        <div className="tag-container">
          <div className="tag-title">이런 카테고리의 미션을 많이 진행했어요</div>
          <div className="tags">
            {Object.keys(monthTagCounts).length > 0 ? (
              Object.entries(monthTagCounts).map(([tag, count]) => (
                <div key={tag} className="tag">
                  {tag} ({count})
                </div>
              ))
            ) : (
              <div className="tag-empty">아직 기록이 없어요</div>
            )}
          </div>
        </div>
      </div>

      {/* 미션 진행률 섹션 */}
      <div className="stats-section">
        <div className="stats-title">이번 달에는 미션을 이만큼 진행했어요</div>

        {loading && <p>불러오는 중...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && habitProgressList.length === 0 && !error && (
          <p>이번 달 진행된 미션이 없습니다.</p>
        )}

        {habitProgressList.map((mission) => {
          const fillWidth = `${mission.progress * 100}%`;
          const shadowWidth = `${Math.min(mission.progress * 100 + 20, 100)}%`;

          return (
            <div key={mission.habitId} className="stat-row">
              <span className="mission-name">{mission.habitName}</span>
              <div className="progress-container">
                <div className="progress-shadow" style={{ width: shadowWidth }}></div>
                <div className="progress-fill" style={{ width: fillWidth }}></div>
              </div>
              <span className="percentage">{mission.progress * 100}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Report;
