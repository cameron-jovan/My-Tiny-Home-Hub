'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './DashboardHero.module.css';

const STATS = [
  { label: 'Price Trends', value: '+4.2%', sub: 'Avg. sqft price in PNW', trend: 'up' },
  { label: 'Listing Reach', value: '1.4k', sub: 'Views this week', trend: 'neutral' },
  { label: 'Buyer Interest', value: '28', sub: 'Active leads for A-Frames', trend: 'up' },
  { label: 'Saved Homes', value: '12', sub: 'On your watchlist', trend: 'neutral' },
];

export default function DashboardHero() {
  const { user } = useAuth();

  return (
    <section className={styles.hero}>
      <div className={styles.mainCard}>
        <div className={styles.welcomeInfo}>
          <span className={styles.badge}>Member Dashboard</span>
          <h1 className={styles.title}>Welcome back, {user?.displayName?.split(' ')[0] || 'Julian'}</h1>
          <p className={styles.subtitle}>Your pathway to minimalist living is accelerating. Explore market insights below.</p>
          
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span>Your Path to Tiny Living</span>
              <span className={styles.percent}>60% Complete</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: '60%' }} />
            </div>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={`${styles.dot} ${styles.completed}`}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span>Verify Identity</span>
              </div>
              <div className={styles.step}>
                <div className={styles.dot}></div>
                <span>Set up Stripe</span>
              </div>
              <div className={styles.step}>
                <div className={`${styles.dot} ${styles.completed}`}>
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span>Define Search Area</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLine}>
                <span className={styles.statLabel}>{stat.label}</span>
                {stat.trend === 'up' && (
                  <span className={styles.trendIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  </span>
                )}
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statSub}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
