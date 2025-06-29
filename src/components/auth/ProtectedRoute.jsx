import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;