import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Save the intended path to redirect back after login
      navigate(`/login?redirect=${encodeURIComponent(pathname || '/')}`, { replace: true });
    }
  }, [user, loading, navigate, pathname]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--white-off)'
      }}>
        <div className="spinner"></div>
        <style dangerouslySetInnerHTML={{ __html: `
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--white-smoke);
            border-top: 4px solid var(--navy-accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        ` }} />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
