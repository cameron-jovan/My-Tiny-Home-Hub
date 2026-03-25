'use client';

import React from 'react';
import styles from './RealTimeFeed.module.css';

const EVENTS = [
  { id: 1, title: 'Price Optimization', desc: 'Listing #402 recommended -12% adjustment', time: '12m ago', icon: '📈' },
  { id: 2, title: 'Stripe Payout', desc: 'Success: $1,402.50 to Chase Business', time: '2h ago', icon: '💰' },
];

export default function RealTimeFeed() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Real-time Feed</h3>
      <div className={styles.list}>
        {EVENTS.map((event) => (
          <div key={event.id} className={styles.event}>
            <div className={styles.iconBox}>{event.icon}</div>
            <div className={styles.content}>
              <div className={styles.eventHeader}>
                <span className={styles.eventTitle}>{event.title}</span>
                <span className={styles.time}>{event.time}</span>
              </div>
              <p className={styles.desc}>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.upgradeBtn}>
          Go Professional
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
