import { useEffect, useState } from "react";
import "./UserRecord.css";
import api from "../../api/axios";
import cal from "../../assets/icons/Calendar.png";
import award from "../../assets/icons/Award.png";

export default function UserRecord() {
  const [record, setRecord] = useState({
    streakDays: 0,
    completedMissions: 0,
    topTags: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecord = async () => {
      try {
        const res = await api.get("/mypage", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setRecord({
          streakDays: res.data.streakDays,
          completedMissions: res.data.completedMissions,
          topTags: res.data.topTags || [],
        });
      } catch (err) {
        console.error("record fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecord();
  }, []);

  if (loading) {
    return <p className="record-loading">기록 불러오는 중...</p>;
  }

  return (
    <section className="user-record">
      {/* 헤더 */}
      <header className="mypage-header">
        <span className="mypage-subtitle">User Record</span>
        <h1 className="mypage-title">사용자 기록</h1>
      </header>

      {/* 통계 */}
      <div className="record-stats">
        <div className="stat-item">
          <img src={cal} alt="calendar" className="stat-icon" />
          <span className="stat-text">
            {record.streakDays}일 연속 성공
          </span>
        </div>

        <div className="stat-item">
          <img src={award} alt="award" className="stat-icon" />
          <span className="stat-text">
            완료한 미션 {record.completedMissions}개
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className="record-tags">
        <p className="tag-description">
          이런 카테고리의 미션을 많이 진행했어요
        </p>

        <div className="tag-list">
          {record.topTags.length > 0 ? (
            record.topTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))
          ) : (
            <p className="tag-empty">아직 기록이 없어요</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Tag({ label }) {
  return (
    <div className="tag">
      <span>{label}</span>
    </div>
  );
}
