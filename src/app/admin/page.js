
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    listings: 0,
    posts: 0,
    inquiries: 0,
    users: 0
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const listingSnap = await getDocs(collection(db, 'listings'));
        const postSnap = await getDocs(collection(db, 'posts'));
        const inquirySnap = await getDocs(collection(db, 'inquiries'));
        const userSnap = await getDocs(collection(db, 'users'));

        setStats({
          listings: listingSnap.size,
          posts: postSnap.size,
          inquiries: inquirySnap.size,
          users: userSnap.size
        });

        // Fetch 5 most recent inquiries
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(5));
        const recentInquirySnap = await getDocs(q);
        const inquiries = recentInquirySnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentInquiries(inquiries);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading analytics...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Listings</span>
          <span className={styles.statValue}>{stats.listings}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Blog Posts</span>
          <span className={styles.statValue}>{stats.posts}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Inquiries</span>
          <span className={styles.statValue}>{stats.inquiries}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Subscribed Users</span>
          <span className={styles.statValue}>{stats.users}</span>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Recent Inquiries</h3>
        <p>Latest leads from potential buyers and concierge requests.</p>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Listing/Subject</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.length > 0 ? (
                recentInquiries.map(inquiry => (
                  <tr key={inquiry.id}>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.type === 'listing' ? 'Property' : 'Concierge'}</td>
                    <td>{inquiry.listingTitle || inquiry.inquiryType || 'General'}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[inquiry.status || 'new']}`}>
                        {inquiry.status || 'new'}
                      </span>
                    </td>
                    <td>{inquiry.createdAt?.toDate().toLocaleDateString() || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
