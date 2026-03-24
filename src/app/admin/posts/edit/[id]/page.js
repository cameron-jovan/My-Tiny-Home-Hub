'use client';

import { use } from 'react';
import PostForm from '../../PostForm';
import styles from '../../../admin.module.css';

export default function EditPost({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Edit Blog Post</h2>
        <p>Modify the content of post ID: {id}</p>
      </div>
      <PostForm id={id} />
    </div>
  );
}
