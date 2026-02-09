import { useState } from 'react';
import './AddHabit.css';
const HabitAdd = () => {
  // --- [상태 및 데이터 정의] ---
  const [selectedTag, setSelectedTag] = useState('운동');

  const tags = ['음료', '운동', '기타', '습관', '식사', '취미'];

  const habits = [
    { id: 1, name: '습관1', desc: 'Menu description.', shortcut: '⇧A' },
    { id: 2, name: '습관2', desc: 'Menu description.', shortcut: '⇧A' },
    { id: 3, name: '습관3', desc: 'Menu description.', shortcut: '⇧A' },
  ];

  // --- [아이콘 컴포넌트] ---
  const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 1L1 13M1 1L13 13"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );

      {/* --- [실제 화면 구조] --- */}
      return(
          <div className="add-container">
            
            {/* 1. 상단 영역 */}
            <div className="header-section">
              <div>
                <h2 className="header-title">추가할 습관을 선택해주세요</h2>
              </div>
              
              <div className="tags-grid">
                {tags.map((tag) => (
                  <div 
                    key={tag} 
                    className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag} <CloseIcon />
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 리스트 카드 영역 */}
            <div className="list-card">
              <div className="card-header-text">
                <span className="card-sub-label">태그에 따른 습관 목록</span>
                {/* 클릭한 태그에 따라 제목이 바뀝니다 */}
                <div className="card-main-label">{selectedTag}</div>
              </div>

              <div className="divider"></div>

              <div className="habit-list">
                {habits.map((habit) => (
                  <div key={habit.id} className="habit-item">
                    <StarIcon />
                    <div className="habit-info">
                      <div className="habit-top">
                        <span className="habit-name">{habit.name}</span>
                        <span className="shortcut-badge">{habit.shortcut}</span>
                      </div>
                      <p className="habit-desc">{habit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
      );
};

export default HabitAdd;
