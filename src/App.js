import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (!isLoggedIn && currentPath !== '/register' && currentPath !== '/admin') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, currentPath]);

  const isAdmin = user?.email === 'hamzaelsharkh@gmail.com';

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={isAdmin ? <Dashboard /> : <HomePage />} />
    </Routes>
  );
}

export default App;