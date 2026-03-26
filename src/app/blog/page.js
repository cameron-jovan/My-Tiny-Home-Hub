import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialCard from '@/components/EditorialCard';
import Newsletter from '@/components/Newsletter';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import Breadcrumbs from '@/components/Breadcrumbs';
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
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      </div>
      <main className={styles.page}>
        {/* Featured Hero */}
        {featured && (
          <section
            className={styles.heroSection}
            style={{ backgroundImage: `url(${featured.image})` }}
          >
            <img
              src="/images/hero-blog.jpg"
              alt="Hero background"
              style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,43,80,0.82) 0%, rgba(27,64,115,0.65) 60%, rgba(6,121,155,0.55) 100%)' }} aria-hidden="true" />
            <div className={styles.heroOverlay} />
            <div className={`container ${styles.heroContent}`}>
              <span className={styles.heroTag}>{featured.category}</span>
              <h1 className={styles.heroTitle}>
                <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
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
