'use client';
import Link from 'next/link';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ brandTitle, brandSubtitle, children }) {
  return (
    <div className={styles.page}>
      <div className={styles.brand}>
        <div className={styles.brandInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>MTHH</span>
            <span className={styles.logoName}>My Tiny Home Hub</span>
          </Link>
          <div className={styles.headline}>
            <h2>{brandTitle}</h2>
            <p>{brandSubtitle}</p>
          </div>
          <ul className={styles.trustList}>
            {['Free to list. No upfront fees.', 'Live within 24 hours of approval.', 'Reach financing-ready buyers.'].map((text, i) => (
              <li key={i} className={styles.trustItem}>
                <span className={styles.checkIcon}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className={styles.previewCard}>
            <div className={styles.previewStatus}>
              <span className={styles.liveDot} />
              <span>Live listing</span>
            </div>
            <p className={styles.previewTitle}>Modern Mountain THOW</p>
            <div className={styles.previewRow}>
              <span className={styles.previewPrice}>$89,500</span>
              <span className={styles.previewBadge}>Financing Available</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.formInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
