import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Flame } from 'lucide-react';

const RankingPage = () => {
  const data = [
    { name: '월', score: 80 }, { name: '화', score: 100 }, { name: '수', score: 60 },
    { name: '목', score: 90 }, { name: '금', score: 100 }, { name: '토', score: 50 }, { name: '일', score: 70 },
  ];

  const styles = {
    container: { padding: '30px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' },
    header: { fontSize: '26px', fontWeight: 'bold', marginBottom: '25px', color: '#1e293b' },
    statsGrid: { display: 'flex', gap: '15px', marginBottom: '30px' },
    statCard: { flex: 1, padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
    chartCard: { height: '350px', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🏆 명예의 전당</h1>
      
      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}>
          <Flame size={32} style={{ margin: '0 auto 8px', opacity: 0.9 }} />
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>연속 성공</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>12일</p>
        </div>
        <div style={{ ...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <Trophy size={32} style={{ margin: '0 auto 8px', opacity: 0.9 }} />
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>획득 트로피</p>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>5개</p>
        </div>
      </div>

      <div style={styles.chartCard}>
        <h3 style={{ margin: '0 0 25px 0', fontSize: '18px', fontWeight: 'bold', color: '#475569' }}>이번 주 열정 그래프</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
              cursor={{ fill: '#f1f5f9' }} 
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.score === 100 ? '#3b82f6' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default RankingPage;