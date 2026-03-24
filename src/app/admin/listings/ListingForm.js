'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function ListingForm({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    sqft: 0,
    beds: '',
    type: 'Tiny House on Wheels',
    status: 'Ready',
    location: '',
    financingAvailable: true,
    image: '',
    amenities: [],
    seller: { name: '', verified: true },
    specs: {
      length: '', width: '', height: '',
      weight: '', trailer: '',
      insulation: '', water: '',
      electrical: '', hvac: ''
    }
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchListing() {
        const docRef = doc(db, 'listings', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setFormData(snap.data());
        }
      }
      fetchListing();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
      }));
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.filter(a => a !== value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const storageRef = ref(storage, `listings/${Date.now()}_${imageFile.name}`);
        const uploadTask = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      const submissionData = {
        ...formData,
        image: imageUrl,
        photos: formData.photos || [imageUrl],
        updatedAt: new Date()
      };

      if (id) {
        await setDoc(doc(db, 'listings', id), submissionData);
      } else {
        await addDoc(collection(db, 'listings'), {
          ...submissionData,
          createdAt: new Date()
        });
      }

      router.push('/admin/listings');
      router.refresh();

    } catch (error) {
      console.error("Error saving listing:", error);
      alert("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Price ($)</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
            placeholder="e.g. Portland, OR" 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Tiny House on Wheels">Tiny House on Wheels</option>
            <option value="ADU / Backyard Suite">ADU / Backyard Suite</option>
            <option value="Park Model">Park Model</option>
            <option value="Container Home">Container Home</option>
            <option value="Modular Foundation">Modular Foundation</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
        <label>Description</label>
        <textarea 
          name="description" 
          rows="4" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Sq Ft</label>
          <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Beds</label>
          <input type="text" name="beds" value={formData.beds} onChange={handleChange} placeholder="e.g. 1 Loft, 2 BR" />
        </div>
        <div className={styles.formGroup}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Ready">Ready</option>
            <option value="Pre-Order">Pre-Order</option>
            <option value="Custom">Custom</option>
            <option value="In Stock">In Stock</option>
            <option value="Limited">Limited</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Seller Name</label>
          <input type="text" name="seller.name" value={formData.seller.name} onChange={handleChange} required />
        </div>
      </div>

      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
        <label>Main Image</label>
        {formData.image && (
          <div className={styles.imagePreview}>
            <img src={formData.image} alt="Preview" />
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])} 
        />
      </div>

      <div className={styles.specsSection} style={{ marginTop: '2rem' }}>
        <h4>Specifications</h4>
        <div className={styles.formGrid}>
          {Object.keys(formData.specs).map(specKey => (
            <div key={specKey} className={styles.formGroup}>
              <label style={{ textTransform: 'capitalize' }}>{specKey}</label>
              <input 
                type="text" 
                name={`specs.${specKey}`} 
                value={formData.specs[specKey]} 
                onChange={handleChange} 
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button type="submit" className={styles.buttonPrimary} disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Listing' : 'Create Listing')}
        </button>
        <button 
          type="button" 
          className={styles.buttonSecondary} 
          onClick={() => router.push('/admin/listings')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
