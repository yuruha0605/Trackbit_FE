import { useEffect, useState } from "react";
import "./MyTrophy.css";

function MyTrophy() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 여기에 API 호출
    // fetch("/api/trophies")
    //   .then(res => res.json())
    //   .then(data => setMissions(data));

    setTimeout(() => {
      setMissions([]); // ← 초기 상태
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="mytrophy">로딩 중...</div>;
  }

  return (
    <div className="mytrophy">
      <section className="mytrophy-header">
        <h2>완료한 미션</h2>
        <span className="subtitle">Trophy</span>
      </section>

      {/* ✅ 미션이 없을 때 */}
      {missions.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">아직 완료한 미션이 없어요 🏆</p>
          <p className="empty-desc">
            첫 미션을 완료하면 트로피가 여기에 쌓여요!
          </p>
        </div>
      ) : (
        <>
          {/* ✅ 미션 카드 */}
          <section className="mission-list">
            {missions.map((mission) => (
              <div className="mission-card" key={mission.id}>
                <div className="mission-icon" />

                <div className="mission-content">
                  <h3 className="mission-title">{mission.title}</h3>
                  <p className="mission-desc">{mission.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/*pagination (데이터 있을 때만) */}
          <section className="pagination">
            <button className="page-btn disabled">Previous</button>

            <div className="page-numbers">
              <button className="page-btn active">1</button>
            </div>

            <button className="page-btn">Next</button>
          </section>
        </>
      )}
    </div>
  );
}

export default MyTrophy;
