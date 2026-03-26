
import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../admin.module.css';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', count: 0, image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // ID of currently edited category

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'categories'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: name === 'count' ? Number(value) : value
    }));

    if (name === 'name' && !newCategory.slug) {
      setNewCategory(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = newCategory.image;
      if (imageFile) {
        const storageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
        const uploadTask = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      const categoryData = { ...newCategory, image: imageUrl };

      if (isEditing) {
        await setDoc(doc(db, 'categories', isEditing), categoryData);
      } else {
        await addDoc(collection(db, 'categories'), categoryData);
      }

      setNewCategory({ name: '', slug: '', count: 0, image: '' });
      setImageFile(null);
      setIsEditing(null);
      fetchCategories();
    } catch (error) {
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (cat) => {
    setIsEditing(cat.id);
    setNewCategory({ name: cat.name, slug: cat.slug, count: cat.count, image: cat.image });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    }
  };

  if (loading && categories.length === 0) return <div className={styles.loading}>Loading categories...</div>;

  return (
    <div className={styles.adminSection}>
      <div className={styles.card} style={{ marginBottom: '3rem' }}>
        <h3>{isEditing ? 'Edit Category' : 'Create New Category'}</h3>
        <p>Categories define the search filters on the Browse page.</p>
        
        <form onSubmit={handleSave} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input 
              name="name" 
              value={newCategory.name} 
              onChange={handleInputChange} 
              required 
              placeholder="e.g. Container Homes"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Slug</label>
            <input 
              name="slug" 
              value={newCategory.slug} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Display Count</label>
            <input 
              type="number" 
              name="count" 
              value={newCategory.count} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image</label>
            <input 
              type="file" 
              onChange={(e) => setImageFile(e.target.files[0])} 
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
            <button type="submit" className={styles.buttonPrimary}>
              {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
            </button>
            {isEditing && (
              <button 
                type="button" 
                className={styles.buttonSecondary} 
                onClick={() => { setIsEditing(null); setNewCategory({ name: '', slug: '', count: 0, image: '' }); }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>
                  <img 
                    src={cat.image || '/images/placeholder.png'} 
                    alt={cat.name} 
                    style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.count}</td>
                <td className={styles.actions}>
                  <button onClick={() => startEdit(cat)} className={styles.btnEdit}>Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className={styles.btnDelete}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
