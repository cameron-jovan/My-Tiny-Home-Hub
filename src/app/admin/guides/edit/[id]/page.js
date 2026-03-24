'use client';

import GuideForm from '../../GuideForm';
import styles from '../../../admin.module.css';

export default function EditGuide({ params }) {
  const { id } = params;

  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Edit Guide</h2>
        <p>Update the guide title, description, or PDF asset.</p>
      </div>
      <GuideForm id={id} />
    </div>
  );
}
