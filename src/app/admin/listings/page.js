
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from '../admin.module.css';

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    setLoading(true);
    try {
      const q = query(collection(db, 'listings'), orderBy('title', 'asc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this listing? Projects this ID will be permanently removed.")) {
      try {
        await deleteDoc(doc(db, 'listings', id));
        setListings(prev => prev.filter(l => l.id !== id));
      } catch (error) {
        alert("Failed to delete listing.");
      }
    }
  }

  if (loading) return <div className={styles.loading}>Loading listings...</div>;

  return (
    <div className={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Current Listings ({listings.length})</h2>
        <Link to="/admin/listings/new" className={styles.buttonPrimary}>
          + Add New Listing
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.id}>
                <td>{listing.title}</td>
                <td>${listing.price?.toLocaleString()}</td>
                <td>{listing.location}</td>
                <td>{listing.type}</td>
                <td>{listing.status}</td>
                <td className={styles.actions}>
                  <Link to={`/admin/listings/edit/${listing.id}`} className={styles.btnEdit}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(listing.id)} 
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
