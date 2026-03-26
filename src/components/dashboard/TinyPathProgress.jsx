'use client';

import React from 'react';
import styles from './TinyPathProgress.module.css';

export default function TinyPathProgress() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3>Your Path to Tiny Living</h3>
          <p>60% Complete — You&apos;re getting close!</p>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: '60%' }} />
        </div>
      </div>

      <div className={styles.steps}>
        {[
          { label: 'Verify Identity', status: 'completed' },
          { label: 'Set Up Stripe', status: 'pending' },
          { label: 'Define Search Area', status: 'pending' },
        ].map((step, i) => (
          <div key={i} className={`${styles.step} ${styles[step.status]}`}>
            <span className={styles.stepDot}>
              {step.status === 'completed' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
            </span>
            <span>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
