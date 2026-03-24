'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './dashboard.module.css';

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <main className={styles.dashboardPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.displayName || user?.email}</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/profile" className="btn btn-secondary" style={{marginRight: '1rem'}}>Manage Profile</Link>
            <button onClick={logout} className="btn btn-outline">Sign Out</button>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Saved Listings</h3>
            <p className={styles.statNumber}>12</p>
          </div>
          <div className={styles.statCard}>
            <h3>Active Inquiries</h3>
            <p className={styles.statNumber}>3</p>
          </div>
          <div className={styles.statCard}>
            <h3>Profile Completeness</h3>
            <p className={styles.statNumber}>85%</p>
          </div>
        </section>

        <section className={styles.recentActivity}>
          <h2>Recent Activity</h2>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>🏠</div>
              <div className={styles.activityDetails}>
                <p className={styles.activityTitle}>Saved "The Nordic Minimalist"</p>
                <p className={styles.activityTime}>2 hours ago</p>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>📧</div>
              <div className={styles.activityDetails}>
                <p className={styles.activityTitle}>Inquiry sent to Nordic Tiny Co.</p>
                <p className={styles.activityTime}>Yesterday</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
