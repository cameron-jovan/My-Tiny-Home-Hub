'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import EditorialCard from '@/components/EditorialCard';
import Newsletter from '@/components/Newsletter';
import InquiryModal from '@/components/InquiryModal';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, limit, where } from 'firebase/firestore';
import styles from './page.module.css';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestGuides, setLatestGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topicHubs, setTopicHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch listings
        const lSnap = await getDocs(query(collection(db, 'listings'), limit(6)));
        setFeaturedListings(lSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch posts
        const pSnap = await getDocs(query(collection(db, 'posts'), limit(6)));
        const allPosts = pSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setFeaturedPosts(allPosts.filter(p => p.featured).slice(0, 3));
        setLatestGuides(allPosts.slice(0, 4));

        // Fetch categories
        const cSnap = await getDocs(collection(db, 'categories'));
        setCategories(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch topicHubs
        const tSnap = await getDocs(collection(db, 'topicHubs'));
        setTopicHubs(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <>
      <Navbar />
      <main className={styles.loadingPage}>
        <div className={styles.loadingSpinner}>Crafting your tiny future...</div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <Image
            src="/images/listings/nordic.png"
            alt="Tiny home in scenic landscape"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>Less Home, More Living</div>
            <h1>
              Buying a tiny home<br />
              should be as easy as<br />
              <span>buying a car.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The tiny home market is growing fast — but buying one has always been fragmented, opaque, and full of risk. My Tiny Home Hub is the first end-to-end marketplace: verified listings, financing guidance, and expert concierge service, all in one place.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/browse" className="btn btn-primary btn-lg">
                Browse Homes
              </Link>
              <Link href="/#concierge" className={styles.heroCtaGhost}>
                Get Concierge Service
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <span>Verified Listings</span>
              <span className={styles.heroTrustDot} aria-hidden="true">·</span>
              <span>Financing Guidance</span>
              <span className={styles.heroTrustDot} aria-hidden="true">·</span>
              <span>Expert Concierge</span>
            </div>
          </div>

          <div className={styles.heroImages}>
            <div className={styles.heroImg}>
              <Image
                src="/images/listings/offgrid.png"
                alt="Off-grid tiny home"
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className={styles.heroImgLabel}>Off-Grid Ready</span>
            </div>
            <div className={styles.heroImg}>
              <Image
                src="/images/listings/urban-adu.png"
                alt="Urban ADU"
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className={styles.heroImgLabel}>The Midwick Suite</span>
            </div>
            <div className={styles.heroImg}>
              <Image
                src="/images/listings/desert.png"
                alt="Desert tiny home"
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className={styles.heroImgLabel}>Desert Modern</span>
            </div>
            <div className={styles.heroMarketCard}>
              <div className={styles.heroMarketStat}>4.03M</div>
              <div className={styles.heroMarketLabel}>Homes missing from the U.S. market</div>
              <div className={styles.heroMarketSub}>1.82M young households priced out of homeownership</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AS SEEN ON ===== */}
      <section className={styles.proofBar} id="as-seen-on">
        <p className={styles.seenOnLabel}>As Seen On</p>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[
              { name: 'Redfin',        style: { color: '#CC092F', fontWeight: 700 } },
              { name: 'Built America', style: { color: '#1B4073', fontWeight: 700 } },
              { name: 'FOX News',      style: { color: '#003399', fontWeight: 800 } },
              { name: 'Google News',   style: { color: '#202124', fontWeight: 600 } },
              { name: 'Redfin',        style: { color: '#CC092F', fontWeight: 700 } },
              { name: 'Built America', style: { color: '#1B4073', fontWeight: 700 } },
              { name: 'FOX News',      style: { color: '#003399', fontWeight: 800 } },
              { name: 'Google News',   style: { color: '#202124', fontWeight: 600 } },
            ].map((item, i) => (
              <span key={i} className={styles.marqueeItem} style={item.style}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BROWSE BY STYLE ===== */}
      <section className={styles.categoriesSection} id="browse-by-style">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Style</h2>
            <Link href="/browse" className="view-all-link">
              View All Styles →
            </Link>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map(cat => (
              <Link href={`/browse?type=${cat.slug}`} key={cat.slug} className={styles.categoryCard}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>{cat.name}</div>
                  <div className={styles.categoryCount}>{cat.count} models</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CURATED LISTINGS ===== */}
      <section className={styles.listingsSection} id="curated-listings">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Curated Listings</h2>
              <p style={{ color: 'var(--gray-500)', marginTop: '4px', fontSize: '0.9375rem' }}>
                Hand-picked homes ready for their next chapter.
              </p>
            </div>
            <Link href="/browse" className="view-all-link">
              View All Listings →
            </Link>
          </div>
          <div className={styles.listingsGrid}>
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE EDITORIAL DISPATCH ===== */}
      <section className={styles.editorialSection} id="editorial-dispatch">
        <div className="container">
          <div className="section-header">
            <h2>The Tiny Edit</h2>
            <Link href="/blog" className="view-all-link">
              View All Stories →
            </Link>
          </div>
          <div className={styles.editorialGrid}>
            {featuredPosts.map(post => (
              <EditorialCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOPIC HUBS ===== */}
      <section className={styles.topicSection} id="topic-hubs">
        <div className="container">
          <div className={styles.topicGrid}>
            {topicHubs.map(hub => (
              <Link href={`/blog?category=${hub.slug}`} key={hub.slug} className={styles.topicCard}>
                <span className={styles.topicIcon}>{hub.icon}</span>
                <div className={styles.topicName}>{hub.name}</div>
                <div className={styles.topicDesc}>{hub.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONCIERGE CTA ===== */}
      <section className={styles.concierge} id="concierge">
        <div className="container">
          <div className={styles.conciergeInner}>
            <h2>Ready to Buy? We&apos;ll Guide Every Step.</h2>
            <p>
              Our experts handle the complex details so you can focus on finding your perfect home.
            </p>
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => setShowInquiry(true)}
            >
              Book Concierge Service
            </button>
          </div>
        </div>
      </section>

      {showInquiry && (
        <InquiryModal 
          onClose={() => setShowInquiry(false)} 
          type="concierge" 
        />
      )}

      {/* ===== NEWSLETTER ===== */}
      <Newsletter variant="default" />

      {/* ===== LATEST GUIDES ===== */}
      <section className={styles.guidesSection} id="latest-guides">
        <div className="container">
          <div className="section-header">
            <h2>Latest Technical Guides</h2>
            <Link href="/blog" className="view-all-link">
              View All Guides →
            </Link>
          </div>
          <div className={styles.guidesGrid}>
            {latestGuides.slice(0, 4).map(post => (
              <EditorialCard key={post.id} post={post} variant="wide" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
