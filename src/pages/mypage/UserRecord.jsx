import "./UserRecord.css";

export default function UserRecord() {
  return (
    <section className="user-record">
      {/* 헤더 */}
      <header className="record-header">
        <span className="record-subtitle">User Record</span>
        <h1 className="record-title">사용자 기록</h1>
      </header>

      {/* 통계 */}
      <div className="record-stats">
        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <span className="stat-text">n일 연속 성공</span>
        </div>

        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <span className="stat-text">완료한 미션 n개</span>
        </div>
      </div>

      {/* 태그 */}
      <div className="record-tags">
        <p className="tag-description">
          이런 카테고리의 미션을 많이 진행했어요
        </p>

        <div className="tag-list">
          <Tag label="Tag" />
          <Tag label="Tag" />
          <Tag label="Tag" />
        </div>
      </div>
    </section>
  );
}

function Tag({ label }) {
  return (
    <div className="tag">
      <span>{label}</span>
      <span className="tag-icon">+</span>
    </div>
  );
}
