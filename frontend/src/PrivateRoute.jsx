import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  // Check if the user is authenticated
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
