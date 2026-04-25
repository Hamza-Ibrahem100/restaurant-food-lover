import React from 'react';
import { useAuth } from '../context/AuthContext';

function AuthPopup() {
  const { popup } = useAuth();

  if (!popup) return null;

  return (
    <div className="auth-popup">
      <h3>{popup.isSuccess ? 'Welcome!' : 'Error'}</h3>
      <p>{popup.message}</p>
    </div>
  );
}

export default AuthPopup;