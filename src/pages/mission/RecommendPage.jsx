import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle } from 'lucide-react';

const RecommendPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalysis = () => {
    setLoading(true);
    // AI가 분석하는 척 2초 딜레이
    setTimeout(() => {
        setLoading(false);
        setResult({
            habit: "아침 공복에 물 한 잔 & 스트레칭",
            reason: "사용자님의 '건강' 관심사와 불규칙한 생활 패턴을 분석했을 때, 가장 부담 없이 시작할 수 있는 루틴입니다.",
            period: "추천 기간: 2주 (Level 1)"
        });
    }, 2000);
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
                <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>요즘 가장 관심 있는 분야는?</h3>
                <div style={{ textAlign: 'left' }}>
                    {['💪 헬스/운동', '📚 독서/공부', '🥗 식단 관리', '💤 수면 패턴'].map(tag => (
                        <span key={tag} style={styles.tag}>{tag}</span>
                    ))}
                </div>
                
                <button style={styles.button} onClick={handleAnalysis} disabled={loading}>
                    {loading ? (
                        <>
                            <Brain className="animate-pulse" /> AI가 분석 중입니다...
                        </>
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
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>추천 습관</p>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#3b82f6' }}>{result.habit}</h3>
                    
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>추천 이유</p>
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