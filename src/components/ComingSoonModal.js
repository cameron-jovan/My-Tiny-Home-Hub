'use client';

import { useEffect, useState } from 'react';
import styles from './ComingSoonModal.module.css';

const STORAGE_KEY = 'mthh_coming_soon_dismissed';

export default function ComingSoonModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) dismiss();
  }

  if (!visible) return null;

  return (
    <>
      <script async src="https://subscribe-forms.beehiiv.com/embed.js" />
      <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Coming Soon">
        <div className={styles.modal}>

          {/* Dismiss */}
          <button className={styles.close} onClick={dismiss} aria-label="Dismiss">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Badge */}
          <div className={styles.eyebrow}>
            <span className={styles.badge}>Coming Soon</span>
          </div>

          {/* Headline */}
          <h2 className={styles.headline}>
            Buying a tiny home online,{' '}
            <span className={styles.accent}>as easy as buying a car.</span>
          </h2>

          <p className={styles.sub}>
            My Tiny Home Hub is building the first end-to-end marketplace for tiny homes &amp; ADUs —
            browse verified listings, get financing, and close the deal, all in one place.
          </p>

          {/* Beehiiv form */}
          <div className={styles.formWrap}>
            <p className={styles.formLabel}>Be first to know when we launch.</p>
            <iframe
              src="https://subscribe-forms.beehiiv.com/1707f6a6-7f94-46e2-a94b-07e6d351d33a"
              className={`beehiiv-embed ${styles.beehiivFrame}`}
              data-test-id="beehiiv-embed"
              frameBorder="0"
              scrolling="no"
            />
          </div>

          {/* Trust signals */}
          <div className={styles.trust}>
            <span>🏡 Tiny homes</span>
            <span className={styles.dot}>·</span>
            <span>🔑 ADUs</span>
            <span className={styles.dot}>·</span>
            <span>⚡ Off-grid living</span>
          </div>

          <button className={styles.dismissText} onClick={dismiss}>
            No thanks, I'll check back later
          </button>

        </div>
      </div>
    </>
  );
}
