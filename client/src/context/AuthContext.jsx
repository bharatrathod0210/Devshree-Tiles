import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('devshree-admin');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setAdmin(userData);
    localStorage.setItem('devshree-admin', JSON.stringify(userData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('devshree-admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
