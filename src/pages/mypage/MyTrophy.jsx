import { useEffect, useState } from "react";
import "./MyTrophy.css";
import award from "../../assets/icons/Award.png";
import api from "../../api/axios.js"

const ITEMS_PER_PAGE = 6;

function MyTrophy() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/api/trophies", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setMissions(data);
      } catch (err) {
        console.error("트로피 조회 실패:", err);
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrophies();
  }, []);

  if (loading) {
    return <div className="mytrophy">로딩 중...</div>;
  }

  // 미션 없을 때
  if (missions.length === 0) {
    return (
      <div className="mytrophy">
        <section className="mytrophy-header">
          <span className="subtitle">Trophy</span>
          <h2 className="mytrophy-title">완료한 미션</h2>
        </section>

        <div className="empty-state">
          <p className="empty-title">아직 완료한 미션이 없어요 🏆</p>
          <p className="empty-desc">
            첫 미션을 완료하면 트로피가 여기에 쌓여요!
          </p>
        </div>
      </div>
    );
  }

  /** pagination 계산 */
  const totalPages = Math.ceil(missions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMissions = missions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="mytrophy">
      <section className="mytrophy-header">
          <span className="subtitle">Trophy</span>
          <h2 className="mytrophy-title">완료한 미션</h2>
      </section>

      {/* 미션 카드 */}
      <section className="mission-list">
        {currentMissions.map((mission) => (
          <div className="mission-card" key={mission.id}>
            <img src={award} alt="award" className="mission-icon" />

            <div className="mission-content">
              <h3 className="mission-title">{mission.title}</h3>
              <p className="mission-desc">{mission.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* pagination */}
      <section className="pagination">
        {/* Previous */}
        <button
          className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        {/* page numbers */}
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          className={`page-btn ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </section>
    </div>
  );
}

export default MyTrophy;
