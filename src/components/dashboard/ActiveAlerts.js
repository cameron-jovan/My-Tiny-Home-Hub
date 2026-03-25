'use client';

import React from 'react';
import styles from './ActiveAlerts.module.css';

const ALERTS = [
  { id: 1, title: 'Pacific Northwest', sub: 'Price drops & New listings', count: 8, color: '#228BE6' },
  { id: 2, title: 'Modern A-Frames', sub: 'New listings only', count: 4, color: '#FAB005' },
];

export default function ActiveAlerts() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Search Agents</span>
          <h3>Active Alerts</h3>
        </div>
        <span className={styles.liveBadge}>
          <span className={styles.pulse} />
          Live
        </span>
      </div>
      <div className={styles.list}>
        {ALERTS.map((alert) => (
          <div key={alert.id} className={styles.alert}>
            <div className={styles.iconBox} style={{ backgroundColor: `${alert.color}15`, color: alert.color }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className={styles.alertInfo}>
              <span className={styles.alertTitle}>{alert.title}</span>
              <span className={styles.alertSub}>{alert.sub}</span>
            </div>
            <div className={styles.alertCount}>
              {alert.count}
            </div>
          </div>
        ))}
        <button className={styles.addBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Alert
        </button>
      </div>
    </div>
  );
}
