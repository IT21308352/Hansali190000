import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => localStorage.getItem('authToken'));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail'));

  // Derived state for authentication status
  const isAuthenticated = !!auth;

  const login = (token, email = null) => {
    setAuth(token);
    localStorage.setItem('authToken', token);
    
    // If email is provided during login, save it
    if (email) {
      setUserEmail(email);
      localStorage.setItem('userEmail', email);
    }
  };

  const logout = () => {
    setAuth(null);
    setUserEmail(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  };

  // Check if user is still authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    
    if (token) {
      setAuth(token);
    }
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      auth, 
      userEmail,
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};