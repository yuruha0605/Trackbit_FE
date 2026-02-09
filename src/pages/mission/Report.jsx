import React from 'react';
import '../../styles/Report.css';

const Report = () => {
  // 데이터 예시
  const tagData = ['운동', '독서', '기상'];
  
  const missionData = [
    { name: '미션명1', darkPercent: 2, lightPercent: 1, totalPercent: '3.3%' },
    { name: '미션명2', darkPercent: 5, lightPercent: 10, totalPercent: '15.2%' },
    { name: '미션명3', darkPercent: 10, lightPercent: 20, totalPercent: '33.5%' },
  ];

  return (
    <div className="report-container">
      
      {/* 상단 섹션: 요약 카드 + 태그 */}
      <div className="report-top-section">
        <div className="result-card">
          <div className="result-text">이번 달의<br />미션 결과입니다</div>
        </div>

        <div className="tags-wrapper">
          <h2 className="section-title">이런 카테고리의 미션을 많이 진행했어요</h2>
          <div className="tags-list">
            {tagData.map((tag, index) => (
              <div key={index} className="tag-item">
                <span>{tag}</span>
                {/* 닫기 아이콘 SVG */}
                <svg className="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 섹션: 미션 진행도 바 */}
      <div className="report-bottom-section">
        <h2 className="section-title">이번 달에는 미션을 이만큼 진행했어요</h2>
        
        <div className="progress-list">
          {missionData.map((mission, index) => (
            <div key={index} className="progress-item">
              <span className="mission-name">{mission.name}</span>
              
              <div className="progress-bar-container">
                {/* 진한 보라색 바 */}
                <div 
                  className="bar-fill-dark" 
                  style={{ width: `${mission.darkPercent}%` }} 
                />
                {/* 연한 보라색 바 */}
                <div 
                  className="bar-fill-light" 
                  style={{ width: `${mission.lightPercent}%` }} 
                />
              </div>

              <span className="progress-percent">{mission.totalPercent}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Report;