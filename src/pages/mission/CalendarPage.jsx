import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { CheckSquare, Square, MessageCircle, Bot } from 'lucide-react';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  
  // 미션 상태 관리 (체크 여부 포함)
  const [missions, setMissions] = useState([
    { id: 1, title: '아침 7시 기상하기', desc: '레벨1: 3일 연속 도전 중 (2일차)', completed: true },
    { id: 2, title: '물 2L 마시기', desc: '레벨2: 일주일 도전 중 (5일차)', completed: false },
  ]);

  // 진행률 계산 로직
  const total = missions.length;
  const completedCount = missions.filter(m => m.completed).length;
  const progress = Math.round((completedCount / total) * 100);

  // 🤖 AI 응원 메시지 (상태에 따라 멘트 변경)
  const getAiMessage = () => {
    if (progress === 0) return "시작이 반입니다! 오늘도 힘차게 출발해볼까요? 💪";
    if (progress < 100) return "잘하고 있어요! 남은 미션도 완료해서 퍼펙트 데이를 만들어봐요! 🔥";
    return "완벽해요! 오늘의 목표를 모두 달성하셨군요. 내일도 이 기세로! 🎉";
  };

  // 미션 체크 토글 함수
  const toggleMission = (id) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const styles = {
    container: { padding: '40px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'flex-start', fontFamily: 'sans-serif' },
    leftCol: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
    rightCol: { flex: 1, paddingTop: '10px' },
    calendarCard: { padding: '20px', borderRadius: '24px', border: '1px solid #e5e7eb', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    progressCard: { padding: '25px', borderRadius: '20px', border: '1px solid #e5e7eb', backgroundColor: 'white' },
    aiCard: { padding: '20px', borderRadius: '20px', background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', color: '#fff', marginTop: '20px', boxShadow: '0 4px 15px rgba(142, 197, 252, 0.4)' },
    missionItem: { display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '25px', cursor: 'pointer', padding: '15px', borderRadius: '12px', transition: 'background 0.2s' },
    missionText: { fontSize: '18px', color: '#333', lineHeight: '1.4', fontWeight: 'bold' },
    subText: { fontSize: '14px', color: '#666', marginTop: '4px', background: '#f3f4f6', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' },
    progressBarBg: { width: '100%', height: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', marginTop: '15px', overflow: 'hidden' },
    progressBarFill: { width: `${progress}%`, height: '100%', backgroundColor: '#333', borderRadius: '6px', transition: 'width 0.5s ease-in-out' }
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽: 달력 + 진행률 */}
      <div style={styles.leftCol}>
        <div style={styles.calendarCard}>
          <Calendar
            onChange={setDate}
            value={date}
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date }) => {
              // 예시: 2월 21일 강조
              if (date.getDate() === 21 && date.getMonth() === 1) {
                  return <div style={{ width: '6px', height: '6px', background: '#333', borderRadius: '50%', margin: '5px auto' }}></div>;
              }
            }}
          />
        </div>

        <div style={styles.progressCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>오늘의 달성률</span>
            <span style={{ color: '#888', fontWeight: 'bold' }}>{progress}%</span>
          </div>
          <div style={styles.progressBarBg}>
            <div style={styles.progressBarFill}></div>
          </div>
        </div>

        {/* 🤖 AI 응원 메시지 영역 (AI-001) */}
        <div style={styles.aiCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Bot size={24} />
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>AI Coach</span>
            </div>
            <p style={{ lineHeight: '1.5', fontSize: '15px' }}>
                "{getAiMessage()}"
            </p>
        </div>
      </div>

      {/* 오른쪽: 미션 목록 */}
      <div style={styles.rightCol}>
        <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
          {date.getMonth() + 1}월 {date.getDate()}일의 미션
        </h3>
        
        {missions.map((mission) => (
            <div 
                key={mission.id} 
                style={{ ...styles.missionItem, backgroundColor: mission.completed ? '#f9fafb' : 'white', border: mission.completed ? '1px solid #eee' : '1px solid white' }}
                onClick={() => toggleMission(mission.id)}
            >
                {mission.completed ? <CheckSquare size={28} color="#333" /> : <Square size={28} color="#ccc" />}
                <div>
                    <div style={{ ...styles.missionText, textDecoration: mission.completed ? 'line-through' : 'none', color: mission.completed ? '#aaa' : '#333' }}>
                        {mission.title}
                    </div>
                    <div style={styles.subText}>{mission.desc}</div>
                </div>
            </div>
        ))}
      </div>

      <style>{`
        .react-calendar { border: none; width: 100%; font-family: sans-serif; }
        .react-calendar__navigation button { font-size: 18px; font-weight: bold; }
        .react-calendar__tile { padding: 15px 0; font-size: 14px; }
        .react-calendar__tile--now { background: #f3f4f6; border-radius: 12px; color: #333; }
        .react-calendar__tile--active { background: #333 !important; color: white !important; border-radius: 12px; }
      `}</style>
    </div>
  );
};
export default CalendarPage;