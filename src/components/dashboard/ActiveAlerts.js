'use client';

import React from 'react';
import styles from './ActiveAlerts.module.css';

const ALERTS = [
  { id: 1, title: 'Hunt #1', count: 12, label: 'Properties in Bend, OR' },
];

export default function ActiveAlerts() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Active Alerts</h3>
        <span className={styles.badge}>Live</span>
      </div>
      <div className={styles.list}>
        {ALERTS.map((alert) => (
          <div key={alert.id} className={styles.alert}>
            <div className={styles.alertInfo}>
              <span className={styles.alertTitle}>{alert.title}</span>
              <span className={styles.alertLabel}>{alert.label}</span>
            </div>
            <div className={styles.alertCount}>
              <span>{alert.count}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        ))}
        <button className={styles.addBtn}>
          <div className={styles.plusIcon}>+</div>
          <span>Add New Automated Search</span>
        </button>
      </div>
    </div>
  );
}
