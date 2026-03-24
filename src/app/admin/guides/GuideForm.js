'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function GuideForm({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileName: '',
    fileUrl: '',
    downloadCount: 0,
    category: 'Technical',
    status: 'Published'
  });

  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchGuide() {
        const docRef = doc(db, 'guides', id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setFormData(snap.data());
        }
      }
      fetchGuide();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = formData.fileUrl;
      let fileName = formData.fileName;

      if (pdfFile) {
        const storageRef = ref(storage, `guides/${Date.now()}_${pdfFile.name}`);
        const uploadTask = await uploadBytes(storageRef, pdfFile);
        fileUrl = await getDownloadURL(uploadTask.ref);
        fileName = pdfFile.name;
      }

      const submissionData = {
        ...formData,
        fileUrl,
        fileName,
        updatedAt: new Date()
      };

      if (id) {
        await setDoc(doc(db, 'guides', id), submissionData);
      } else {
        await addDoc(collection(db, 'guides'), {
          ...submissionData,
          createdAt: new Date(),
          downloadCount: 0
        });
      }

      router.push('/admin/guides');
      router.refresh();

    } catch (error) {
      console.error("Error saving guide:", error);
      alert("Failed to save guide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Guide Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="e.g. ADU Zoning Checklist"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Technical">Technical</option>
            <option value="Legal">Legal</option>
            <option value="Financial">Financial</option>
            <option value="Design">Design</option>
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
          placeholder="What will users learn from this guide?"
        />
      </div>

      <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
        <label>Guide PDF File</label>
        {formData.fileUrl && (
          <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'var(--gray-50)', borderRadius: '4px', fontSize: '0.875rem' }}>
            Current file: <a href={formData.fileUrl} target="_blank" rel="noopener noreferrer">{formData.fileName}</a>
          </div>
        )}
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={(e) => setPdfFile(e.target.files[0])} 
          className={styles.fileInput}
        />
        <p className={styles.helpText}>Upload a PDF guide that users can download.</p>
      </div>

      <div className={styles.formGroup}>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button type="submit" className={styles.buttonPrimary} disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Guide' : 'Create Guide')}
        </button>
        <button 
          type="button" 
          className={styles.buttonSecondary} 
          onClick={() => router.push('/admin/guides')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
