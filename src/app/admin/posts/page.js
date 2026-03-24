'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        setPosts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        alert("Failed to delete post.");
      }
    }
  }

  if (loading) return <div className={styles.loading}>Loading posts...</div>;

  return (
    <div className={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Blog Posts ({posts.length})</h2>
        <Link href="/admin/posts/new" className={styles.buttonPrimary}>
          + Create New Post
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.featured ? '⭐' : ''}</td>
                <td className={styles.actions}>
                  <Link href={`/admin/posts/edit/${post.id}`} className={styles.btnEdit}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id)} 
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
