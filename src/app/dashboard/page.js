'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import DashboardHero from '@/components/dashboard/DashboardHero';

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <DashboardSidebar />
      
      <div className={styles.mainWrapper}>
        <DashboardHeader />
        
        <main className={styles.content}>
          <DashboardHero />
          
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.leftCol}>
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.eyebrow}>Your Collections</span>
                    <h3>Recently Saved</h3>
                  </div>
                  <button className={styles.viewLink}>Manage Watchlist</button>
                </div>
                <SavedListingsGallery />
              </section>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.eyebrow}>Active Listings</span>
                    <h3>Inventory & Performance</h3>
                  </div>
                  <button className={styles.viewLink}>View Detailed Analytics</button>
                </div>
                <InventoryPerformance />
              </section>

              <section className={styles.communityPulse}>
                <div className={styles.sectionHeader}>
                  <div>
                    <span className={styles.eyebrow}>Community Pulse</span>
                    <h3>Active Discussions</h3>
                  </div>
                  <button className={styles.viewLink}>All Topics</button>
                </div>
                <div className={styles.pulseGrid}>
                  <div className={`${styles.pulseCard} ${styles.green}`}>
                    <div className={styles.avatarCluster}>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatar}></div>
                      <div className={styles.avatarCount}>+12 <span>viewing now</span></div>
                    </div>
                    <h4>New ADU laws in California: What you need to know for 2024</h4>
                    <Link href="/discussions/adu-laws" className={styles.pulseLink}>
                      Join Discussion
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                  <div className={`${styles.pulseCard} ${styles.pink}`}>
                    <span className={styles.hotTopic}>Hot Topic</span>
                    <h4>Mastering Spatial Intelligence: Why 400sqft is the new luxury</h4>
                    <Link href="/guides/spatial-intelligence" className={styles.pulseLink}>
                      View Guide
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <aside className={styles.rightCol}>
              <PersonalConcierge />
              <ActiveAlerts />
              <RealTimeFeed />
              
              <div className={styles.goProBanner}>
                <h4>Go Professional</h4>
                <p>Unlock advanced analytics, bulk listing tools, and verified builder status.</p>
                <button className={styles.proBtn}>Upgrade Now</button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
