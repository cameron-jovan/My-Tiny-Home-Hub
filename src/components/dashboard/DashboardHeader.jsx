'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search Listings, Guides, or Sellers..." />
      </div>

      <div className={styles.actions}>
        <nav className={styles.navLinks}>
          <Link href="/explore" className={styles.navLink}>Buy & Explore</Link>
          <Link href="/manage" className={styles.navLink}>Sell & Manage</Link>
          <Link href="/editorial" className={styles.navLink}>Editorial</Link>
        </nav>

        <button className={styles.createBtn}>
          Create New Listing
        </button>

        <button className={styles.iconBtn} aria-label="Notifications">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className={styles.notificationDot} />
        </button>

        <div className={styles.userDropdown}>
          <div className={styles.avatar}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            )}
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
