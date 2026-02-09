import React, { useState } from 'react';
import { User, Send } from 'lucide-react';

const ReviewPage = () => {
  // 댓글 데이터 상태 관리
  const [reviews, setReviews] = useState([
    { id: 1, user: '홍길동', content: '오늘 운동 진짜 힘들었다...', time: '10분 전' },
    { id: 2, user: '김공감', content: '오 고생하셨어요! 👍', time: '방금 전' },
  ]);
  const [inputText, setInputText] = useState('');

  // 댓글 등록 함수
  const handleAddReview = () => {
    if (!inputText.trim()) return; // 빈칸이면 실행 X
    const newReview = {
      id: reviews.length + 1,
      user: '본인', // 현재 로그인한 유저라고 가정
      content: inputText,
      time: '방금 전'
    };
    setReviews([...reviews, newReview]); // 목록에 추가
    setInputText(''); // 입력창 비우기
  };

  const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', height: '80vh', fontFamily: 'sans-serif' },
    leftCard: { flex: 1, backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' },
    rightCard: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
    imageBox: { width: '100%', height: '300px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '20px' },
    missionInfo: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' },
    reviewList: { flex: 1, overflowY: 'auto', paddingRight: '10px' },
    reviewItem: { backgroundColor: 'white', padding: '20px', borderRadius: '16px', marginBottom: '15px', border: '1px solid #f0f0f0' },
    inputArea: { backgroundColor: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' },
    input: { flex: 1, border: 'none', outline: 'none', fontSize: '16px' },
    sendBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#333' }
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽: 미션 인증샷 및 정보 */}
      <div style={styles.leftCard}>
        <div style={styles.imageBox}>
          이미지 영역 (455x540)
        </div>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>미션명: 오운완!</h2>
          <p style={{ fontSize: '18px', color: '#666' }}>2026년 2월 9일에 완료한 미션입니다.</p>
          <p style={{ marginTop: '15px', lineHeight: '1.6', color: '#444' }}>
            오늘 하체 운동을 했는데 다리가 너무 아프네요. 그래도 뿌듯합니다!
          </p>
        </div>
      </div>

      {/* 오른쪽: 후기(댓글) 목록 & 입력창 */}
      <div style={styles.rightCard}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>습관 공유 ({reviews.length})</h3>
        
        <div style={styles.reviewList}>
          {reviews.map((review) => (
            <div key={review.id} style={styles.reviewItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={16} />
                </div>
                <span style={{ fontWeight: 'bold' }}>{review.user}</span>
                <span style={{ fontSize: '12px', color: '#888' }}>{review.time}</span>
              </div>
              <p style={{ color: '#333', fontSize: '16px' }}>{review.content}</p>
            </div>
          ))}
        </div>

        {/* 댓글 입력창 */}
        <div style={styles.inputArea}>
          <input 
            type="text" 
            placeholder="응원의 댓글을 남겨주세요..." 
            style={styles.input}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddReview()} 
          />
          <button style={styles.sendBtn} onClick={handleAddReview}>
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;