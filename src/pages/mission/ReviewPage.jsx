import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Send, Trash2, Edit2 } from 'lucide-react'; 
import { useSearchParams } from 'react-router-dom'; 

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]); 
  const [inputText, setInputText] = useState('');
  
  const [searchParams] = useSearchParams();
  const missionId = searchParams.get('id') || 1; 
  
  const token = localStorage.getItem('accessToken') || '';

  // 댓글 조회 
  const fetchReviews = async () => {
    if (!token) return;
    try {
        const res = await axios.get(`http://localhost:8888/comments/mission/${missionId}/comment`, {
            headers: { Authorization: token }
        });
        setReviews(res.data || []);
    } catch (error) {
        console.error("댓글 로딩 실패", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [missionId]); 

  // 댓글 수정 
  const handleEditReview = async (commentId, oldContent) => {
    const newContent = prompt("수정할 내용을 입력해주세요:", oldContent);
    if (newContent === null || newContent.trim() === "") return;

    try {
      await axios.put(`http://localhost:8888/comments/update/${commentId}`, {
        title: "미션 후기",
        content: newContent
      }, {
        headers: { Authorization: token }
      });

      // 성공 시 화면 업데이트
      setReviews(prevReviews => 
        prevReviews.map(review => 
          (review.commentId || review.id) === commentId 
            ? { ...review, content: newContent } 
            : review
        )
      );
      alert("수정되었습니다!");
    } catch (error) {
      console.error("수정 실패", error);
      alert("수정에 실패했습니다.");
    }
  };

  //  댓글 삭제 
  const handleDeleteReview = async (commentId) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:8888/comments/delete/${commentId}`, {
        headers: { Authorization: token }
      });

      setReviews(prevReviews => 
        prevReviews.filter(review => (review.commentId || review.id) !== commentId)
      );
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 댓글 작성 
  const handleAddReview = async () => {
    if (!inputText.trim()) return;
    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }

    try {
        await axios.post(`http://localhost:8888/comments/mission/${missionId}/comments/create`, {
            missionId: missionId,
            title: "미션 후기", 
            content: inputText
        }, {
            headers: { Authorization: token } 
        });
        
        setInputText('');
        fetchReviews();
    } catch (error) {
        console.error("댓글 작성 실패", error);
        alert("댓글 저장 실패");
    }
  };

  const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', height: '80vh', fontFamily: 'sans-serif' },
    leftCard: { width: '400px', minWidth: '400px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' },
    rightCard: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
    imageBox: { width: '100%', height: '350px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '20px' },
    reviewList: { flex: 1, overflowY: 'auto', paddingRight: '10px' },
    reviewItem: { backgroundColor: 'white', padding: '20px', borderRadius: '16px', marginBottom: '15px', border: '1px solid #f0f0f0' },
    inputArea: { backgroundColor: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' },
    input: { flex: 1, border: 'none', outline: 'none', fontSize: '16px' },
    sendBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#333' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftCard}>
        <div style={styles.imageBox}>미션 인증샷 영역</div>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>미션 ID: {missionId}</h2>
          <p style={{ fontSize: '18px', color: '#666' }}>오늘의 미션 완료!</p>
        </div>
      </div>

      <div style={styles.rightCard}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>습관 공유 ({reviews.length})</h3>
        
        <div style={styles.reviewList}>
          {reviews.length > 0 ? reviews.map((review) => (
            <div key={review.commentId || review.id} style={styles.reviewItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{review.userId || '익명'}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Edit2 size={18} color="#999" style={{ cursor: 'pointer' }} onClick={() => handleEditReview(review.commentId || review.id, review.content)} />
                    <Trash2 size={18} color="#999" style={{ cursor: 'pointer' }} onClick={() => handleDeleteReview(review.commentId || review.id)} />
                </div>
              </div>
              <p style={{ color: '#333', fontSize: '16px' }}>{review.content}</p>
            </div>
          )) : <p style={{color:'#999'}}>아직 작성된 후기가 없습니다.</p>}
        </div>

        <div style={styles.inputArea}>
          <input type="text" placeholder="응원의 댓글을 남겨주세요..." style={styles.input} value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddReview()} />
          <button style={styles.sendBtn} onClick={handleAddReview}><Send size={24} /></button>
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;