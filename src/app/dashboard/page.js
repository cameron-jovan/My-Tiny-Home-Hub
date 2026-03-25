'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TinyPathProgress from '@/components/dashboard/TinyPathProgress';
import StatsGrid from '@/components/dashboard/StatsGrid';
import SavedListingsGallery from '@/components/dashboard/SavedListingsGallery';
import PersonalConcierge from '@/components/dashboard/PersonalConcierge';
import ActiveAlerts from '@/components/dashboard/ActiveAlerts';
import RealTimeFeed from '@/components/dashboard/RealTimeFeed';
import InventoryPerformance from '@/components/dashboard/InventoryPerformance';
import styles from './dashboard.module.css';

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <DashboardSidebar />
      
      <div className={styles.mainWrapper}>
        <DashboardHeader />
        
        <main className={styles.content}>
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.leftCol}>
              <header className={styles.welcomeHead}>
                <div className={styles.welcomeText}>
                  <h1>Welcome back, {user?.displayName?.split(' ')[0] || 'Julian'}</h1>
                  <p>Here&apos;s what&apos;s happening with your tiny home journey today.</p>
                </div>
              </header>

              <TinyPathProgress />
              
              <section className={styles.section}>
                <SavedListingsGallery />
              </section>

              <section className={styles.section}>
                <InventoryPerformance />
              </section>

              <section className={styles.communitySection}>
                <div className={styles.sectionHeader}>
                  <h3>Community Pulse</h3>
                  <button className={styles.viewLink}>Join Discussion</button>
                </div>
                <div className={styles.pulseGrid}>
                  <div className={styles.pulseCard}>
                    <span className={styles.pulseTag}>Zoning</span>
                    <h4>New ADU laws in California: What you need to know for 2024</h4>
                    <div className={styles.pulseMeta}>12 comments · 4m ago</div>
                  </div>
                  <div className={styles.pulseCard}>
                    <span className={styles.pulseTag}>Financing</span>
                    <h4>Comparing 3 tiny home lenders for off-grid projects</h4>
                    <div className={styles.pulseMeta}>8 comments · 1h ago</div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <aside className={styles.rightCol}>
              <StatsGrid />
              <PersonalConcierge />
              <ActiveAlerts />
              <RealTimeFeed />
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
