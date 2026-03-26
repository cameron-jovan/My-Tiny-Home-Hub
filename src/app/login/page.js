
import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import styles from './login.module.css';

function getErrorMessage(err) {
  const code = err?.code || '';
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') return 'Incorrect email or password.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Try again in a few minutes.';
  if (code === 'auth/user-disabled') return 'This account has been disabled.';
  if (code === 'auth/unauthorized-domain') return 'This domain is not authorized for Google Sign-In. Please check Firebase Console.';
  if (code === 'auth/operation-not-allowed') return 'Google Sign-In is not enabled in Firebase Console.';
  if (code === 'auth/popup-blocked') return 'Sign-in popup was blocked by your browser.';
  if (code === 'auth/cancelled-popup-request') return 'Sign-in was cancelled.';
  return 'Something went wrong. Please try again.';
}

function LoginContent() {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleGoogle = async () => {
    setError(''); setLoading(true);
    try { await loginWithGoogle(); router.push(redirectPath); }
    catch (err) { setError(getErrorMessage(err)); setLoading(false); }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try { await loginWithEmail(email, password); router.push(redirectPath); }
    catch (err) { setError(getErrorMessage(err)); setLoading(false); }
  };

  return (
    <AuthLayout
      brandTitle="The marketplace serious tiny home buyers trust."
      brandSubtitle="Over 3,200 qualified buyers search MTHH every month. List your home where they are."
    >
      <div className={styles.header}>
        <h1>Welcome back</h1>
        <p>Sign in to your account</p>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      <button onClick={handleGoogle} className={styles.googleBtn} disabled={loading} type="button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </button>

      <div className={styles.divider}><span>or</span></div>

      <form onSubmit={handleEmail} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.pwWrap}>
            <input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required autoComplete="current-password" />
            <button type="button" className={styles.pwToggle} onClick={() => setShowPw(p => !p)} aria-label={showPw ? 'Hide' : 'Show'}>
              {showPw
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className={styles.footer}>
        No account yet? <Link to="/signup">Create one free</Link>
      </p>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginContent /></Suspense>;
}
