import "./AlertModal.css";

function AlertModal({ title, description, onConfirm, onClose }) {
  return (
    <div className="alert-overlay">
      <div className="alert-card">
        {/* 닫기 버튼 */}
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>

        {/* 내용 */}
        <div className="alert-content">
          <h2 className="alert-title">{title}</h2>
          <p className="alert-description">{description}</p>
        </div>

        {/* 액션 */}
        <div className="alert-actions">
          <button className="alert-confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
