'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import styles from './InquiryModal.module.css';

export default function InquiryModal({ listing, onClose, type = 'general' }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    message: type === 'listing' ? `I'm interested in the ${listing?.title}.` : 'I would like to book a concierge consultation.',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        userId: user?.uid || 'anonymous',
        listingId: listing?.id || null,
        listingTitle: listing?.title || null,
        createdAt: new Date(),
        status: 'new',
        type
      });
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (err) {
      console.error('Error sending inquiry:', err);
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✨</div>
            <h2>Inquiry Sent!</h2>
            <p>Our team will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <h2>{type === 'listing' ? 'Enquire About Listing' : 'Book Concierge Service'}</h2>
            <p className={styles.subtitle}>
              {type === 'listing' ? `Subject: ${listing?.title}` : 'Talk to a Tiny Home expert'}
            </p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
<div className={styles.formGroup}>
                <label>Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows="4"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
