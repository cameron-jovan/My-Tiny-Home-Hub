'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from './profile.module.css';

function ProfileContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfile(data);
          setName(data.displayName || '');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: name,
        updatedAt: new Date(),
      });
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to update profile.', type: 'error' });
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;

  return (
    <main className={styles.profilePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Profile Settings</h1>
          <p>Manage your account details and preferences</p>
        </header>

        <section className={styles.profileSection}>
          {message.text && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate} className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" value={user?.email} disabled className={styles.disabledInput} />
              <small>Email cannot be changed.</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="displayName">Display Name</label>
              <input 
                id="displayName"
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should we call you?"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Role</label>
              <div className={styles.roleBadge}>{profile?.role || 'user'}</div>
            </div>

            <div className={styles.formGroup}>
              <label>Member Since</label>
              <p className={styles.joinDate}>
                {profile?.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : 'N/A'}
              </p>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
