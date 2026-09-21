import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRoleSlug } from '@/types';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: UserRoleSlug[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, currentRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying clinical credentials & permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.includes(currentRole.slug) || currentRole.slug === 'platform-admin';
    if (!hasRole) {
      return <Navigate to="/access-denied" state={{ requiredRoles: allowedRoles, attemptedPath: location.pathname }} replace />;
    }
  }

  return children ? <>{children}</> : null;
};

