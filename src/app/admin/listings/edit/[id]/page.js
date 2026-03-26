import { useParams } from 'react-router-dom';
import ListingForm from '../../ListingForm';
import styles from '../../../admin.module.css';

export default function EditListing() {
  const { id } = useParams();

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
