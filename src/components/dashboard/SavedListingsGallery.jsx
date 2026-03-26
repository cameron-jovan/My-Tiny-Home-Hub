'use client';

import React from 'react';
import styles from './SavedListingsGallery.module.css';

const SAVED_HOMES = [
  { 
    id: 1, 
    title: 'The Nordic Minimalist', 
    price: '$85,000', 
    location: 'Bend, OR', 
    rating: 4.9,
    img: '/nordic_minimalist_tiny_home_1774439181336.png' 
  },
  { 
    id: 2, 
    title: 'Modern A-Frame', 
    price: '$112,000', 
    location: 'Asheville, NC', 
    rating: 4.8,
    img: '/modern_aframe_tiny_home_1774439198685.png' 
  },
  { 
    id: 3, 
    title: 'Desert Escape', 
    price: '$72,500', 
    location: 'Joshua Tree, CA', 
    rating: 4.7,
    img: '/desert_escape_tiny_home_1774439212307.png' 
  },
  { 
    id: 4, 
    title: 'Urban Loft', 
    price: '$94,000', 
    location: 'Austin, TX', 
    rating: 4.9,
    img: '/urban_loft_tiny_home_1774439230995.png' 
  },
];

export default function SavedListingsGallery() {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {SAVED_HOMES.map((home) => (
          <div key={home.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={home.img} alt={home.title} className={styles.image} />
              <div className={styles.priceTag}>{home.price}</div>
              <button className={styles.heartBtn} aria-label="Remove from saved">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6B6B" stroke="#FF6B6B" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
            </div>
            <div className={styles.info}>
              <div className={styles.titleLine}>
                <h4>{home.title}</h4>
                <div className={styles.rating}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FAB005" stroke="#FAB005">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>{home.rating}</span>
                </div>
              </div>
              <div className={styles.locationLine}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{home.location}</span>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.addCard}>
          <div className={styles.addIcon}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <span>Find more homes</span>
        </div>
      </div>
    </section>
  );
}
