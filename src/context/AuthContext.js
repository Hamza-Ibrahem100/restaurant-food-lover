import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('foodLoverUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const showPopup = (message, isSuccess = true) => {
    setPopup({ message, isSuccess });
    setTimeout(() => setPopup(null), 1500);
  };

  const saveUser = (provider, userData = {}) => {
    const data = {
      provider,
      email: userData.email || `${provider.toLowerCase()}@user.com`,
      firstName: userData.firstName || 'User',
      lastName: userData.lastName || 'Name'
    };
    localStorage.setItem('foodLoverUser', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('foodLoverUser');
    localStorage.removeItem('rememberMe');
    setUser(null);
    showPopup('Signed out successfully.', true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const value = {
    user,
    popup,
    showPopup,
    saveUser,
    logout,
    isLoggedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}