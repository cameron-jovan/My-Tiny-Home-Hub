'use client';

import GuideForm from '../GuideForm';
import styles from '../../admin.module.css';

export default function NewGuide() {
  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Create Downloadable Guide</h2>
        <p>Add a PDF guide that users can access after providing their email.</p>
      </div>
      <GuideForm />
    </div>
  );
}
