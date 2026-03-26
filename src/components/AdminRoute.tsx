import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (userData && userData.role !== 'admin') {
        navigate('/dashboard');
      }
    }
  }, [user, userData, loading, navigate]);

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

  if (!user || (userData && userData.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}
