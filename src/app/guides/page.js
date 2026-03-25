'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './guides.module.css';

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const q = query(
          collection(db, 'guides'), 
          where('status', '==', 'Published'),
          orderBy('title', 'asc')
        );
        const snap = await getDocs(q);
        setGuides(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, []);

  const handleDownloadClick = (guide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setDownloading(true);
    
    // In a real app, you'd save this email to your mailing list (e.g. Beehiiv/Firestore)
    console.log(`Email captured: ${email} for guide: ${selectedGuide.title}`);
    
    // Simulate processing
    setTimeout(() => {
      // Trigger download
      const link = document.createElement('a');
      link.href = selectedGuide.fileUrl;
      link.download = selectedGuide.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloading(false);
      setShowModal(false);
      setEmail('');
      alert("Your download has started! Thank you for choosing My Tiny Home Hub.");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />
      </div>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1>Technical Guides & Resources</h1>
            <p className={styles.heroSubtitle}>
              Expert-vetted checklists, zoning guides, and financing intel to help you build your tiny future.
            </p>
          </div>
        </section>

        <section className={styles.guidesList}>
          <div className="container">
            {loading ? (
              <div className={styles.loading}>Curating guides...</div>
            ) : guides.length > 0 ? (
              <div className={styles.grid}>
                {guides.map(guide => (
                  <div key={guide.id} className={styles.card}>
                    <div className={styles.categoryTag}>{guide.category}</div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <button 
                      onClick={() => handleDownloadClick(guide)}
                      className="btn btn-primary"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>New guides coming soon! Check back for zoning checklists and financing intel.</p>
              </div>
            )}
          </div>
        </section>

        <Newsletter variant="compact" />
      </main>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>&times;</button>
            <h2>Unlock Your Guide</h2>
            <p>Enter your email to receive <strong>{selectedGuide?.title}</strong> and join The Tiny Edit community.</p>
            
            <form onSubmit={handleEmailSubmit} className={styles.form}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className="btn btn-primary btn-lg" disabled={downloading}>
                {downloading ? 'Preparing Download...' : 'Get Instant Access'}
              </button>
            </form>
            <p className={styles.disclaimer}>
              By clicking, you agree to receive our weekly newsletter. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
