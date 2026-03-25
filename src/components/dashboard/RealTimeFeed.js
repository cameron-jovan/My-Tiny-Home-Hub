'use client';

import React from 'react';
import styles from './RealTimeFeed.module.css';

const EVENTS = [
  { 
    id: 1, 
    type: 'optimization',
    title: 'Price Optimization', 
    desc: 'Listing #402 recommended -12% adjustment based on new comps in Bend.', 
    time: '12m ago' 
  },
  { 
    id: 2, 
    type: 'payout',
    title: 'Stripe Payout', 
    desc: 'Success: $1,402.50 to Chase Business account ending in 4291.', 
    time: '2h ago' 
  },
  { 
    id: 3, 
    type: 'insight',
    title: 'Zoning Update', 
    desc: 'New 2024 ADU regulations detected for your search area in Sonoma.', 
    time: '5h ago' 
  },
];

const ICONS = {
  optimization: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  payout: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  insight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
};

export default function RealTimeFeed() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Market Activity</h3>
        <button className={styles.filterBtn}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/>
          </svg>
        </button>
      </div>
      <div className={styles.list}>
        {EVENTS.map((event) => (
          <div key={event.id} className={styles.event}>
            <div className={`${styles.iconBox} ${styles[event.type]}`}>
              {ICONS[event.type]}
            </div>
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
      <button className={styles.viewMore}>View Complete History</button>
    </div>
  );
}
