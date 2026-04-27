import React from 'react';

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Wait!</h2>
        <p>Are you sure you want to leave? We hate to see you go!</p>
        <p className="modal-subtitle">Your session will be ended and you'll need to sign in again to access your account.</p>
        <div className="modal-buttons">
          <button className="modal-btn confirm" onClick={onConfirm}>
            Yes, Log Out
          </button>
          <button className="modal-btn cancel" onClick={onCancel}>
            Keep Me In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;