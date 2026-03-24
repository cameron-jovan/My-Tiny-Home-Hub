'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function PostForm({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Design',
    author: 'Jo\'van Thomas',
    readTime: '10 min read',
    date: new Date().toISOString().split('T')[0],
    image: '',
    featured: false
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchPost() {
        const docRef = doc(db, 'posts', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setFormData(snap.data());
        }
      }
      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title if slug is empty
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
        const uploadTask = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      const submissionData = {
        ...formData,
        image: imageUrl,
        updatedAt: new Date()
      };

      if (id) {
        await setDoc(doc(db, 'posts', id), submissionData);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...submissionData,
          createdAt: new Date()
        });
      }

      router.push('/admin/posts');
      router.refresh();

    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
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
          <label>Slug</label>
          <input 
            type="text" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Design">Design</option>
            <option value="Financing">Financing</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Zoning">Zoning</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Author</label>
          <input 
            type="text" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
        <label>Excerpt (Post Preview)</label>
        <textarea 
          name="excerpt" 
          rows="2" 
          value={formData.excerpt} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
        <label>Content (Full Post Body - Markdown Supported)</label>
        <textarea 
          name="content" 
          rows="12" 
          value={formData.content} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className={styles.formGrid} style={{ marginTop: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label>Read Time</label>
          <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} placeholder="e.g. 5 min read" />
        </div>
        <div className={styles.formGroup}>
          <label>Publish Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className={styles.formGroup} style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center', height: '100%' }}>
          <input 
            type="checkbox" 
            id="featured"
            name="featured" 
            checked={formData.featured} 
            onChange={handleChange} 
            style={{ width: '20px', height: '20px' }}
          />
          <label htmlFor="featured" style={{ cursor: 'pointer' }}>Featured Post</label>
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

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button type="submit" className={styles.buttonPrimary} disabled={loading}>
          {loading ? 'Publishing...' : (id ? 'Update Post' : 'Create Post')}
        </button>
        <button 
          type="button" 
          className={styles.buttonSecondary} 
          onClick={() => router.push('/admin/posts')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
