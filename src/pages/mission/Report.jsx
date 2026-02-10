import './Report.css';

const Report = () => {
  // 미션 데이터 배열
  const missionData = [
    { id: 1, name: '미션명', percent: 3.3, fillWidth: '10%', shadowWidth: '15%' },
    { id: 2, name: '미션명', percent: 15.2, fillWidth: '15%', shadowWidth: '35%' },
    { id: 3, name: '미션명', percent: 33.5, fillWidth: '50%', shadowWidth: '75%' },
  ];

  return (
    <div className="report-container">
      {/* 상단 섹션 */}
      <div className="header-section">
        <div className="title-box">
          이번 달의 미션 결과입니다
        </div>
        <div className="tag-container">
          <div className="tag-title">이런 카테고리의 미션을 많이 진행했어요</div>
          <div className="tags">
            {[1, 2, 3].map((item) => (
              <div key={item} className="tag">
                Tag <span>✕</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 섹션 */}
      <div className="stats-section">
        <div className="stats-title">이번 달에는 미션을 이만큼 진행했어요</div>
        
        {missionData.map((mission) => (
          <div key={mission.id} className="stat-row">
            <span className="mission-name">{mission.name}</span>
            <div className="progress-container">
              {/* 연한 보라색 배경 바 */}
              <div 
                className="progress-shadow" 
                style={{ width: mission.shadowWidth }}
              ></div>
              {/* 진한 보라색 실제 진행 바 */}
              <div 
                className="progress-fill" 
                style={{ width: mission.fillWidth }}
              ></div>
            </div>
            <span className="percentage">{mission.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
