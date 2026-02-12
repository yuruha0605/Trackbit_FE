import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { CheckSquare, Square, Bot } from 'lucide-react';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [missions, setMissions] = useState([]); 
  const [completedDates, setCompletedDates] = useState([]); 
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || ''; 

  // 1. 초기 데이터 로드
  useEffect(() => {
    if (token) {
        fetchMyData();
    } else {
        console.warn("로그인 토큰이 없습니다. 로그인해주세요.");
        setLoading(false);
    }
  }, [date]); 

  const fetchMyData = async () => {
    setLoading(true);
    try {
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      const monthParam = `${year}-${month}`;
      const dateParam = `${year}-${month}-${day}`;

      // [1] 달력 데이터 (월간 스탬프)
      try {
        const logResponse = await axios.get(
            `http://localhost:8888/mission-logs/calendar?month=${monthParam}`,
            {
                headers: { Authorization: `Bearer ${token}` } // 저장된 토큰 사용
            }
        );
        const dates = logResponse.data.activeDates || logResponse.data || [];
        setCompletedDates(dates);
      } catch (err) {
        console.warn("달력 데이터 로딩 실패");
      }

      // [2] 오늘의 미션 목록
      const missionResponse = await axios.get(
        `http://localhost:8888/mission-logs/daily?date=${dateParam}`,
        {
            headers: { Authorization: `Bearer ${token}` } 
        }
      );
      console.log("통신 성공 여부:", missionResponse.status); 
      console.log("백엔드에서 준 데이터 전체:", missionResponse.data);
      const missionList = missionResponse.data.missions || [];
      setMissions(missionList);

    } catch (error) {
      console.error("데이터 로딩 에러:", error);
      setMissions([]); 
    } finally {
      setLoading(false);
    }
  };

  // 2. 미션 체크 (토글)
  const toggleMission = async (missionId, currentSuccessStatus) => {
    const newStatus = !currentSuccessStatus;
    setMissions(missions.map(m => 
      m.missionId === missionId ? { ...m, success: newStatus } : m
    ));

    try {
        await axios.post('http://localhost:8888/mission-logs/check', {
            missionId: missionId,
            checkDate: date.toISOString().split('T')[0],
            isChecked: newStatus
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("저장 성공!");
    } catch (error) {
        console.error("저장 실패:", error);
        alert("저장 실패! 다시 시도해주세요.");
        // 실패 시 원상복구
        setMissions(missions.map(m => 
            m.missionId === missionId ? { ...m, success: currentSuccessStatus } : m
        ));
    }
  };


  const total = missions.length;
  const completedCount = missions.filter(m => m.success).length;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const getAiMessage = () => {
    if (progress === 0) return "시작이 반입니다! 오늘도 힘차게 출발해볼까요? 💪";
    if (progress < 100) return "잘하고 있어요! 완벽한 하루를 만들어봐요! 🔥";
    return "완벽해요! 오늘의 목표를 모두 달성하셨군요. 🎉";
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
    progressBarBg: { width: '100%', height: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', marginTop: '15px', overflow: 'hidden' },
    progressBarFill: { width: `${progress}%`, height: '100%', backgroundColor: '#333', borderRadius: '6px', transition: 'width 0.5s ease-in-out' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftCol}>
        <div style={styles.calendarCard}>
          <Calendar
            onChange={setDate}
            value={date}
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              if (completedDates.includes(dateStr)) {
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

        <div style={styles.aiCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Bot size={24} />
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>AI Coach</span>
            </div>
            <p style={{ lineHeight: '1.5', fontSize: '15px' }}>"{getAiMessage()}"</p>
        </div>
      </div>

      <div style={styles.rightCol}>
        <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>
          {date.getMonth() + 1}월 {date.getDate()}일의 미션
        </h3>
        
        {missions.length > 0 ? missions.map((mission) => (
            <div 
                key={mission.missionId} 
                style={{ ...styles.missionItem, backgroundColor: mission.success ? '#f9fafb' : 'white' }}
                onClick={() => toggleMission(mission.missionId, mission.success)}
            >
                {mission.success ? <CheckSquare size={28} color="#333" /> : <Square size={28} color="#ccc" />}
                
                <div>
                    <div style={{ ...styles.missionText, textDecoration: mission.success ? 'line-through' : 'none', color: mission.success ? '#aaa' : '#333' }}>
                        {mission.missionName}
                    </div>
                </div>
            </div>
        )) : <p>등록된 미션이 없습니다.</p>}
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