
import PostForm from '../PostForm';
import styles from '../../admin.module.css';

export default function NewPost() {
  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Create New Blog Post</h2>
        <p>Write an editorial or informational piece for the platform.</p>
      </div>
      <PostForm />
    </div>
  );
}
