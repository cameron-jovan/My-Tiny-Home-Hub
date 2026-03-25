'use client';

import React from 'react';
import CalBookingButton from '@/components/CalBookingButton';
import styles from './PersonalConcierge.module.css';

export default function PersonalConcierge() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || 'mytinyhomehub/30min';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <img src="/concierge_avatar_elena_1774439303500.png" alt="Elena Rossi" className={styles.avatar} />
          <span className={styles.onlineBadge} />
        </div>
        <div className={styles.info}>
          <span className={styles.eyebrow}>Personal Concierge</span>
          <h4>Elena Rossi</h4>
        </div>
      </div>

      <div className={styles.chatBubble}>
        <p>&ldquo;Hey Julian! I noticed you saved 3 new listings in Bend. Would you like me to check their zoning requirements for you?&rdquo;</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.chatBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat Now
        </button>
        <CalBookingButton calLink={calLink} className={styles.bookBtn}>
          Ask a Question
        </CalBookingButton>
      </div>
    </div>
  );
}
