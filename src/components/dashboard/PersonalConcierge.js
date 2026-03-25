'use client';

import React from 'react';
import CalBookingButton from '@/components/CalBookingButton';
import styles from './PersonalConcierge.module.css';

export default function PersonalConcierge() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || 'mytinyhomehub/30min';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <div className={styles.placeholderAvatar}>ER</div>
          <span className={styles.onlineBadge} />
        </div>
        <div className={styles.info}>
          <h4>Elena Rossi</h4>
          <span>Tiny Home Concierge</span>
        </div>
      </div>

      <div className={styles.message}>
        <p>&ldquo;Hey Julian! I noticed you saved 3 new listings in Bend. Would you like me to check their zoning requirements for you?&rdquo;</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.chatBtn}>Chat Now</button>
        <CalBookingButton calLink={calLink} className={styles.bookBtn}>
          Book Strategy
        </CalBookingButton>
      </div>
    </div>
  );
}
