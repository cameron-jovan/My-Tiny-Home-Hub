'use client';

import { use } from 'react';
import ListingForm from '../../ListingForm';
import styles from '../../../admin.module.css';

export default function EditListing({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Edit Listing</h2>
        <p>Modify the details for listing ID: {id}</p>
      </div>
      <ListingForm id={id} />
    </div>
  );
}
