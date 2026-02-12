import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Brain, CheckCircle } from 'lucide-react';



const RecommendPage = () => {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const token = localStorage.getItem('accessToken') || '';
  const habitId = 1; 

  const handleAnalysis = async () => {

    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }

    setLoading(true);

    try {

        const response = await axios.get(`http://localhost:8888/ai/recommend/mission`, {
            params: { habitId: habitId },
            headers: { Authorization: token } 
        });

        const recommendations = response.data.missions || [];

        if (recommendations.length > 0) {
            setResult({
                habit: recommendations[0].missionName,
                reason: recommendations[0].missionDefinition || "AI 분석 기반 추천",
                period: recommendations[0].levelName || "Level 1"
            });

        } else {
            alert("추천할 미션이 없습니다.");
        }

    } catch (error) {
        console.error("AI 분석 실패:", error);
        alert("분석 중 오류가 발생했습니다.");
    } finally {
        setLoading(false);
    }

  };

  const styles = {
    container: { padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' },
    title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' },
    subtitle: { color: '#666', marginBottom: '40px' },
    card: { padding: '30px', borderRadius: '24px', border: '1px solid #e5e7eb', backgroundColor: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
    button: { width: '100%', padding: '15px', marginTop: '20px', borderRadius: '12px', border: 'none', background: '#333', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    resultBox: { marginTop: '30px', textAlign: 'left', background: '#f8f9fa', padding: '20px', borderRadius: '16px' },
    tag: { display: 'inline-block', padding: '8px 16px', borderRadius: '20px', border: '1px solid #ddd', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }
  };



  return (

    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Sparkles size={48} color="#FFD700" />
      </div>
      <h1 style={styles.title}>AI 습관 추천</h1>
      <p style={styles.subtitle}>데이터를 기반으로 당신에게 딱 맞는 습관을 찾아드려요.</p>
      <div style={styles.card}>
        {!result ? (
            <>
                <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>분석할 습관 ID: {habitId}</h3>
                <button style={styles.button} onClick={handleAnalysis} disabled={loading}>
                    {loading ? (
                        <><Brain className="animate-pulse" /> AI가 분석 중입니다...</>
                    ) : (
                        "내 맞춤 습관 분석하기"
                    )}
                </button>
            </>
        ) : (
            <div className="animate-fade-in">
                <CheckCircle size={48} color="#4CAF50" style={{ margin: '0 auto 20px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>분석 완료!</h2>
                <div style={styles.resultBox}>
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>추천 미션</p>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#3b82f6' }}>{result.habit}</h3>
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>설명</p>
                    <p style={{ lineHeight: '1.5', color: '#333', marginBottom: '15px' }}>{result.reason}</p>
                    <div style={{ background: '#333', color: 'white', padding: '5px 10px', borderRadius: '4px', display: 'inline-block', fontSize: '12px' }}>
                        {result.period}
                    </div>
                </div>
                <button style={{ ...styles.button, background: '#f3f4f6', color: '#333' }} onClick={() => setResult(null)}>
                    다시 분석하기
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default RecommendPage;

