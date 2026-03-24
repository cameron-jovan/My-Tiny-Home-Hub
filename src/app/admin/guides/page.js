'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminGuides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  async function fetchGuides() {
    setLoading(true);
    try {
      const q = query(collection(db, 'guides'), orderBy('title', 'asc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      try {
        await deleteDoc(doc(db, 'guides', id));
        setGuides(prev => prev.filter(g => g.id !== id));
      } catch (error) {
        alert("Failed to delete guide.");
      }
    }
  }

  if (loading) return <div className={styles.loading}>Loading guides...</div>;

  return (
    <div className={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Downloadable Guides ({guides.length})</h2>
        <Link href="/admin/guides/new" className={styles.buttonPrimary}>
          + Add New Guide
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>File Name</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.map(guide => (
              <tr key={guide.id}>
                <td>{guide.title}</td>
                <td>{guide.description?.substring(0, 50)}...</td>
                <td>{guide.fileName}</td>
                <td>{guide.downloadCount || 0}</td>
                <td className={styles.actions}>
                  <Link href={`/admin/guides/edit/${guide.id}`} className={styles.btnEdit}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(guide.id)} 
                    className={styles.btnDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
