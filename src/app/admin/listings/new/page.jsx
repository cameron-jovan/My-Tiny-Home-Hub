
import ListingForm from '../ListingForm';
import styles from '../../admin.module.css';

export default function NewListing() {
  return (
    <div className={styles.adminSection}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Add New Listing</h2>
        <p>Enter the details for the new tiny home or ADU.</p>
      </div>
      <ListingForm />
    </div>
  );
}
