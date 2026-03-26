'use client';

import React from 'react';
import styles from './StatsGrid.module.css';

const STATS = [
  { label: 'Price Trends', value: '+4.2%', sub: 'Weekly growth', trend: 'up' },
  { label: 'Listing Reach', value: '1.4k', sub: 'Total impressions', trend: 'neutral' },
  { label: 'Buyer Interest', value: '28', sub: 'Direct inquiries', trend: 'up' },
  { label: 'Saved Homes', value: '12', sub: 'Across 3 states', trend: 'neutral' },
];

export default function StatsGrid() {
  return (
    <div className={styles.grid}>
      {STATS.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.label}>{stat.label}</span>
            {stat.trend === 'up' && (
              <span className={styles.trendUp}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </span>
            )}
          </div>
          <div className={styles.value}>{stat.value}</div>
          <div className={styles.sub}>{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
