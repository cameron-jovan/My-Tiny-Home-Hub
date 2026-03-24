'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ListingCard.module.css';

export default function ListingCard({ listing }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className={styles.card} id={`listing-${listing.id}`}>
      <div className={styles.imageWrap}>
        <Link href={`/listings/${listing.id}`}>
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className={styles.image}
          />
        </Link>
        {listing.financingAvailable && (
          <span className="badge badge-financing financing-tag">
            Financing Available
          </span>
        )}
        <button 
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <Link href={`/listings/${listing.id}`} className={styles.title}>
            {listing.title}
          </Link>
          <span className={styles.price}>
            ${listing.price.toLocaleString()}
          </span>
        </div>

        <p className={styles.desc}>{listing.description}</p>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>SQ FT</span>
            <span className={styles.specValue}>{listing.sqft}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>BEDS</span>
            <span className={styles.specValue}>{listing.beds}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>STATUS</span>
            <span className={`${styles.specValue} ${styles.status}`}>{listing.status}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
