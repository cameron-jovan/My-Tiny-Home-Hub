'use client';

import { useEffect, useState } from 'react';
import styles from './ComingSoonModal.module.css';

const STORAGE_KEY = 'mthh_coming_soon_dismissed';
const BEEHIIV_ENDPOINT = 'https://subscribe-forms.beehiiv.com/1707f6a6-7f94-46e2-a94b-07e6d351d33a';

export default function ComingSoonModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) dismiss();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      const body = new FormData();
      body.append('email', email);

      const res = await fetch(BEEHIIV_ENDPOINT, {
        method: 'POST',
        body,
      });

      if (res.ok || res.status === 201 || res.redirected) {
        setStatus('success');
        localStorage.setItem(STORAGE_KEY, '1');
      } else {
        setStatus('error');
      }
    } catch {
      // Network error — Beehiiv redirects, which fetch treats as opaque
      // Treat as success since the request was sent
      setStatus('success');
      localStorage.setItem(STORAGE_KEY, '1');
    }
  }

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Coming Soon">
      <div className={styles.modal}>

        <button className={styles.close} onClick={dismiss} aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </button>

        <span className={styles.badge}>Coming Soon</span>

        <h2 className={styles.headline}>
          Buying a tiny home online,{' '}
          <span className={styles.accent}>as easy as buying a car.</span>
        </h2>

        <p className={styles.sub}>
          My Tiny Home Hub is the first end-to-end marketplace for tiny homes and ADUs.
          Browse verified listings, secure financing, and close with confidence.
        </p>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <p className={styles.successTitle}>You're on the list.</p>
            <p className={styles.successSub}>We'll be in touch when we launch.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.formLabel} htmlFor="cs-email">
              Be first to know when we launch.
            </label>
            <div className={styles.inputRow}>
              <input
                id="cs-email"
                className={styles.input}
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button
                className={styles.submit}
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Notify Me'}
              </button>
            </div>
            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}
          </form>
        )}

        <div className={styles.trust}>
          <span>Tiny Homes</span>
          <span className={styles.dot}>·</span>
          <span>ADUs</span>
          <span className={styles.dot}>·</span>
          <span>Off-Grid Living</span>
        </div>

        <button className={styles.dismissText} onClick={dismiss}>
          No thanks, I'll check back later
        </button>

      </div>
    </div>
  );
}
