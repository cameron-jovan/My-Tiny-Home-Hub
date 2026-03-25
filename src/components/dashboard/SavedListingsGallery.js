'use client';

import React from 'react';
import styles from './SavedListingsGallery.module.css';

const SAVED_HOMES = [
  { id: 1, title: 'The Nordic Minimalist', price: '$85,000', location: 'Bend, OR', img: '/images/listing-1.jpg' },
  { id: 2, title: 'Modern A-Frame', price: '$112,000', location: 'Asheville, NC', img: '/images/listing-2.jpg' },
  { id: 3, title: 'Desert Escape', price: '$72,500', location: 'Joshua Tree, CA', img: '/images/listing-3.jpg' },
  { id: 4, title: 'Urban Loft', price: '$94,000', location: 'Austin, TX', img: '/images/listing-4.jpg' },
];

export default function SavedListingsGallery() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3>Saved Listings</h3>
        <button className={styles.viewAll}>View All (12)</button>
      </div>
      <div className={styles.scrollArea}>
        {SAVED_HOMES.map((home) => (
          <div key={home.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <div className={styles.placeholderImg}>🏠</div>
              <button className={styles.heartBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--error)" stroke="var(--error)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
            <div className={styles.info}>
              <h4>{home.title}</h4>
              <div className={styles.meta}>
                <span className={styles.price}>{home.price}</span>
                <span className={styles.location}>{home.location}</span>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.addCard}>
          <div className={styles.addIcon}>+</div>
          <span>Find more homes</span>
        </div>
      </div>
    </section>
  );
}
