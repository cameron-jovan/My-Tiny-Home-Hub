'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialCard from '@/components/EditorialCard';
import Newsletter from '@/components/Newsletter';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import styles from './page.module.css';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(results);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featured = posts.find(p => p.featured) || posts[0];
  const rest = posts.filter(p => p.id !== featured?.id);

  if (loading) return (
    <>
      <Navbar />
      <main className={styles.loadingPage}>
        <div className={styles.loadingSpinner}>Loading blog...</div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* Featured Hero */}
        {featured && (
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${featured.image})` }}
          >
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroContent}`}>
              <span className={styles.heroTag}>{featured.category}</span>
              <h1 className={styles.heroTitle}>
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h1>
              <p className={styles.heroMeta}>
                By {featured.author} &nbsp;·&nbsp; {featured.readTime}
              </p>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className={styles.postsSection}>
          <div className="container">
            <div className="section-header">
              <h2>Latest Stories & Guides</h2>
            </div>
            <div className={styles.postsGrid}>
              {rest.map(post => (
                <EditorialCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter variant="dark" />
      </main>
      <Footer />
    </>
  );
}
