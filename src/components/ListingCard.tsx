import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import styles from './ListingCard.module.css';

interface Listing {
  id: string | number;
  title: string;
  image: string;
  price: number;
  description: string;
  sqft: number;
  beds: number | string;
  status: string;
  financingAvailable?: boolean;
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className={styles.card} id={`listing-${listing.id}`}>
      <div className={styles.imageWrap}>
        <Link to={`/listings/${listing.id}`}>
          <img
            src={listing.image}
            alt={listing.title}
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
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
        >
          <Heart className={saved ? 'fill-primary' : ''} size={20} />
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <Link to={`/listings/${listing.id}`} className={styles.title}>
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
