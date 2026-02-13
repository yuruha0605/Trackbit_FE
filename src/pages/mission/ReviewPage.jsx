import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Send, Trash2, Edit2, Camera } from 'lucide-react'; 
import { useSearchParams } from 'react-router-dom'; 

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [dailyMissions, setDailyMissions] = useState([]); 
  const [selectedMissionId, setSelectedMissionId] = useState(1); 
  const [inputText, setInputText] = useState('');
  
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('accessToken') || '';

  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const initId = searchParams.get('id');
    if (initId) setSelectedMissionId(Number(initId));
    fetchDailyMissions();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [selectedMissionId]);

  const fetchDailyMissions = async () => {
    if (!token) return;
    try {
      const dateParam = getTodayStr();
      const res = await axios.get(`http://localhost:8888/mission-logs/daily?date=${dateParam}`, {
        headers: { Authorization: token }
      });
      const list = res.data.missions || res.data || [];
      setDailyMissions(list);
      
      if (!searchParams.get('id') && list.length > 0) {
        setSelectedMissionId(list[0].id);
      }
    } catch (err) {
      console.error("미션 목록 로딩 실패", err);
    }
  };

  const fetchReviews = async () => {
    if (!token) return;
    try {
        const res = await axios.get(`http://localhost:8888/comments/mission/${selectedMissionId}/comment`, {
            headers: { Authorization: token }
        });
        setReviews(res.data || []);
    } catch (error) {
        setReviews([]);
    }
  };

  const handleAddReview = async () => {
    if (!inputText.trim()) return;
    if (!token) { alert("로그인이 필요합니다."); return; }

    try {
        await axios.post(`http://localhost:8888/comments/mission/${selectedMissionId}/comments/create`, {
            missionId: selectedMissionId,
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

  const handleDeleteReview = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`http://localhost:8888/comments/delete/${commentId}`, {
        headers: { Authorization: token }
      });
      setReviews(prev => prev.filter(r => (r.commentId || r.id) !== commentId));
    } catch (error) {
      alert("삭제 실패");
    }
  };

  const handleEditReview = async (commentId, oldContent) => {
    const newContent = prompt("수정할 내용을 입력해주세요:", oldContent);
    if (!newContent || newContent.trim() === "") return;

    try {
      await axios.put(`http://localhost:8888/comments/update/${commentId}`, {

        content: newContent
      }, {
        headers: { Authorization: token }
      });
      
      setReviews(prev => prev.map(r => (r.commentId || r.id) === commentId ? {...r, content: newContent} : r));
      alert("수정되었습니다.");
    } catch (error) {
      alert("수정 실패");
    }
  };

  const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', height: '80vh', fontFamily: 'sans-serif' },
    leftCard: { width: '400px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e5e7eb', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' },
    rightCard: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
    selectBox: { padding: '12px', fontSize: '16px', borderRadius: '8px', border: '2px solid #6366f1', width: '100%', marginBottom: '20px', outline:'none', fontWeight:'bold', color:'#333' },
    imageBox: { width: '100%', height: '350px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '16px', border: '2px dashed #ddd' },
    reviewList: { flex: 1, overflowY: 'auto', paddingRight: '10px' },
    reviewItem: { backgroundColor: 'white', padding: '20px', borderRadius: '16px', marginBottom: '15px', border: '1px solid #f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    inputArea: { backgroundColor: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' },
    input: { flex: 1, border: 'none', outline: 'none', fontSize: '16px' },
    sendBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' },
    actionBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding:'5px' }
  };

  const currentMission = dailyMissions.find(m => m.id === selectedMissionId) || {};

  return (
    <div style={styles.container}>
      <div style={styles.leftCard}>
        <div>
            <label style={{display:'block', marginBottom:'8px', fontWeight:'bold', color:'#555'}}>미션 선택</label>
            <select 
                style={styles.selectBox} 
                value={selectedMissionId} 
                onChange={(e) => setSelectedMissionId(Number(e.target.value))}
            >
                {dailyMissions.length > 0 ? (
                    dailyMissions.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.content || m.title || `미션 ${m.id}`}
                        </option>
                    ))
                ) : (
                    <option value={selectedMissionId}>미션 로딩 중...</option>
                )}
            </select>
        </div>

        <div style={styles.imageBox}>
            <Camera size={48} color="#ccc" style={{marginBottom:'10px'}}/>
            <p style={{fontWeight:'bold', color:'#999'}}>미션 인증샷</p>
        </div>

        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>미션 #{selectedMissionId}</h2>
          <p style={{ color: '#666', fontSize:'16px', marginTop:'5px' }}>
             {currentMission.content || currentMission.title || "오늘의 미션 완료!"}
          </p>
        </div>
      </div>

      <div style={styles.rightCard}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>습관 공유 ({reviews.length})</h3>
        
        <div style={styles.reviewList}>
          {reviews.length > 0 ? reviews.map((review) => (
            <div key={review.commentId || review.id} style={styles.reviewItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems:'center' }}>
                  <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%', display:'flex', justifyContent:'center', alignItems:'center' }}><User size={16}/></div>
                  <span style={{ fontWeight: 'bold' }}>{review.userId || '익명'}</span>
                </div>
                <div style={{display:'flex', gap:'5px'}}>
                    <button style={styles.actionBtn} onClick={() => handleEditReview(review.commentId || review.id, review.content)}>
                        <Edit2 size={16} />
                    </button>
                    <button style={styles.actionBtn} onClick={() => handleDeleteReview(review.commentId || review.id)}>
                        <Trash2 size={16} />
                    </button>
                </div>
              </div>
              <p style={{ color: '#333', lineHeight: '1.5' }}>{review.content}</p>
            </div>
          )) : <p style={{color:'#999', textAlign:'center', marginTop:'50px'}}>첫 번째 후기를 남겨보세요!</p>}
        </div>

        <div style={styles.inputArea}>
          <input 
            type="text" 
            placeholder="서로 응원의 한마디를 남겨주세요..." 
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