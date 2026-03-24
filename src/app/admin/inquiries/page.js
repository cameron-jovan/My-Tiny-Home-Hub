'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, orderBy, query, deleteDoc } from 'firebase/firestore';
import styles from '../admin.module.css';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } catch (error) {
      alert("Failed to update status.");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this inquiry record?")) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      } catch (error) {
        alert("Failed to delete inquiry.");
      }
    }
  }

  if (loading) return <div className={styles.loading}>Loading inquiries...</div>;

  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Customer Inquiries</h2>
        <p>Manage leads and concierge consultation requests.</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Contact Info</th>
              <th>Type</th>
              <th>Subject/Listing</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map(inquiry => (
                <tr key={inquiry.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{inquiry.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--charcoal)' }}>{inquiry.email}</div>
                  </td>
                  <td>{inquiry.type === 'listing' ? 'Property' : 'Concierge'}</td>
                  <td>{inquiry.listingTitle || inquiry.inquiryType || 'General'}</td>
                  <td style={{ maxWidth: '250px', fontSize: '0.85rem' }}>
                    {inquiry.message?.substring(0, 100)}{inquiry.message?.length > 100 ? '...' : ''}
                  </td>
                  <td>
                    <select 
                      value={inquiry.status || 'new'} 
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>{inquiry.createdAt?.toDate().toLocaleDateString() || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(inquiry.id)} 
                      className={styles.btnDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
