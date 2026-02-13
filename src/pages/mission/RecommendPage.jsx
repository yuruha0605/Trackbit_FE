import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Brain, CheckCircle, Activity, BookOpen, Coffee, Monitor } from 'lucide-react';

const RecommendPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('accessToken') || '';
  
  const storedUser = localStorage.getItem('user');
  const userObj = storedUser ? JSON.parse(storedUser) : null;
  const userId = userObj ? userObj.loginId : null;

  const handleGetRecommendation = async () => {
    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }
    if (!userId) {
        alert("유저 정보(ID)를 찾을 수 없습니다. 다시 로그인해주세요.");
        return;
    }

    setLoading(true);
    try {

      const res = await axios.get(`http://localhost:8888/ai/recommend/habit`, {
        headers: { Authorization: token },
        params: { userId: userId } 
      });

      console.log("추천 데이터:", res.data);
      setRecommendations(res.data.recommendedHabits || []);

    } catch (error) {
      console.error("AI 추천 실패", error);
      if (error.response && error.response.status === 400) {
          alert("요청 실패: 사용자 ID가 전달되지 않았습니다.");
      } else {
          alert("AI 추천을 받아오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
    header: { textAlign: 'center', marginBottom: '40px' },
    buttonArea: { display: 'flex', justifyContent: 'center', marginBottom: '50px' },
    recBtn: { 
        padding: '15px 30px', fontSize: '18px', fontWeight: 'bold', color: 'white', 
        backgroundColor: loading ? '#9ca3af' : '#6366f1', 
        border: 'none', borderRadius: '30px', cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s'
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
    card: { backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    tag: { display: 'inline-block', padding: '5px 12px', borderRadius: '15px', fontSize: '14px', marginBottom: '15px', backgroundColor: '#f3f4f6', color: '#4b5563' },
    missionBox: { marginTop: '20px', backgroundColor: '#f9fafb', padding: '15px', borderRadius: '12px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>AI 습관 코치</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
            {userObj ? `${userObj.name}님` : '사용자'}의 직업과 관심사를 분석해 딱 맞는 습관을 추천해드려요.
        </p>
      </div>

      <div style={styles.buttonArea}>
        <button style={styles.recBtn} onClick={handleGetRecommendation} disabled={loading}>
          {loading ? <Sparkles className="spin" /> : <Brain />}
          {loading ? "AI가 분석 중입니다..." : "AI 추천 받기"}
        </button>
      </div>

      <div style={styles.grid}>
        {recommendations.length > 0 ? (
          recommendations.map((habit, idx) => (
            <div key={idx} style={styles.card}>
              <span style={styles.tag}>{habit.tagName || '추천'}</span>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>{habit.habitName}</h3>
              <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>{habit.habitDefinition}</p>
              
              <div style={styles.missionBox}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Activity size={16} /> 추천 미션
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {habit.recommendedMissions && habit.recommendedMissions.map((m, mIdx) => (
                        <li key={mIdx} style={{ marginBottom: '5px', color: '#444' }}>
                            <strong>[{m.levelName}]</strong> {m.missionName}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          !loading && <div style={{textAlign:'center', gridColumn:'1/-1', color:'#999'}}>버튼을 눌러 나에게 맞는 습관을 찾아보세요!</div>
        )}
      </div>
    </div>
  );
};

export default RecommendPage;