'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import Newsletter from '@/components/Newsletter';
import InquiryModal from '@/components/InquiryModal';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, limit, getDocs } from 'firebase/firestore';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

export default function ListingDetailPage({ params }) {
  const { id } = use(params);
  const [listing, setListing] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() });
          
          // Fetch related
          const q = query(collection(db, 'listings'), limit(4));
          const relSnap = await getDocs(q);
          const relData = relSnap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(d => d.id !== id)
            .slice(0, 3);
          setRelated(relData);
        }
      } catch (err) {
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.loadingSpinner}>Loading home details...</div>
      </main>
      <Footer />
    </>
  );

  if (!listing) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-height)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Listing Not Found</h1>
            <p style={{ marginTop: '16px' }}>
              <Link href="/browse" className="btn btn-secondary">Browse All Listings</Link>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const monthlyPayment = Math.round(listing.price * 0.008); 

  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Browse', href: '/browse' }, { label: listing?.title || 'Listing' }]} />
      </div>
      <main className={styles.page}>

        {/* Hero Image */}
        <div className="container">
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              {listing.financingAvailable && (
                <span className="badge badge-financing financing-tag">
                  Financing Available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="container">
          <div className={styles.detailGrid}>
            <div className={styles.mainCol}>
              <div className={styles.titleRow}>
                <div>
                  <h1 className={styles.title}>{listing.title}</h1>
                  <p className={styles.location}>📍 {listing.location}</p>
                </div>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>${listing.price.toLocaleString()}</span>
                  <span className={styles.priceSub}>Est. ${monthlyPayment}/mo</span>
                </div>
              </div>

              <div className={styles.quickSpecs}>
                <div className={styles.quickSpec}>
                  <span className={styles.qsValue}>{listing.sqft}</span>
                  <span className={styles.qsLabel}>SQ FT</span>
                </div>
                <div className={styles.quickSpec}>
                  <span className={styles.qsValue}>{listing.beds}</span>
                  <span className={styles.qsLabel}>BEDS</span>
                </div>
                <div className={styles.quickSpec}>
                  <span className={styles.qsValue}>{listing.type}</span>
                  <span className={styles.qsLabel}>TYPE</span>
                </div>
                <div className={styles.quickSpec}>
                  <span className={`${styles.qsValue} ${styles.statusGreen}`}>{listing.status}</span>
                  <span className={styles.qsLabel}>STATUS</span>
                </div>
              </div>

              <div className={styles.descSection}>
                <h2>About This Home</h2>
                <p>{listing.description}</p>
              </div>

              <div className={styles.specsSection}>
                <h2>Specifications</h2>
                <div className={styles.specsGrid}>
                  {Object.entries(listing.specs).map(([key, value]) => (
                    <div key={key} className={styles.specRow}>
                      <span className={styles.specKey}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                      <span className={styles.specVal}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className={styles.amenitiesSection}>
                  <h2>Amenities & Features</h2>
                  <div className={styles.amenitiesList}>
                    {listing.amenities.map(a => (
                      <span key={a} className={styles.amenityTag}>✓ {a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Seller Card */}
              <div className={styles.sellerCard}>
                <div className={styles.sellerHeader}>
                  <div className={styles.sellerAvatar}>
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={styles.sellerName}>{listing.seller.name}</h4>
                    {listing.seller.verified && (
                      <span className={styles.verifiedBadge}>✓ Verified Seller</span>
                    )}
                  </div>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%' }}
                  onClick={() => setShowInquiry(true)}
                >
                  Contact Seller
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => setShowInquiry(true)}
                >
                  Schedule Tour
                </button>
              </div>

              {/* Financing Calculator */}
              <div className={styles.financeCard}>
                <h4>Financing Preview</h4>
                <div className={styles.financeRow}>
                  <span>Home Price</span>
                  <strong>${listing.price.toLocaleString()}</strong>
                </div>
                <div className={styles.financeRow}>
                  <span>Down Payment (10%)</span>
                  <strong>${Math.round(listing.price * 0.1).toLocaleString()}</strong>
                </div>
                <div className={styles.financeRow}>
                  <span>Est. Monthly</span>
                  <strong className={styles.monthlyHighlight}>${monthlyPayment}/mo</strong>
                </div>
                <p className={styles.financeNote}>
                  *Based on 6.5% APR, 20-year term. Subject to credit approval.
                </p>
                <Link href="/concierge" className="btn btn-primary" style={{ width: '100%' }}>
                  Get Pre-Approved
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Listings */}
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {related.map(l => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />

      {showInquiry && (
        <InquiryModal 
          listing={listing} 
          onClose={() => setShowInquiry(false)} 
          type="listing" 
        />
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": listing.title,
            "description": listing.description,
            "image": listing.image,
            "offers": {
              "@type": "Offer",
              "price": listing.price,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
    </>
  );
}
