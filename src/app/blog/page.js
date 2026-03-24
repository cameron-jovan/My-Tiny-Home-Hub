import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialCard from '@/components/EditorialCard';
import Newsletter from '@/components/Newsletter';
import { seedPosts } from '@/lib/seedData';
import styles from './page.module.css';

export const metadata = {
  title: 'Tiny Living Guides & Stories | My Tiny Home Hub Blog',
  description: 'Expert guides on tiny home financing, zoning, design, and lifestyle. Get the knowledge you need to make your tiny living dream a reality.',
};

export default function BlogPage() {
  const featured = seedPosts.find(p => p.featured);
  const rest = seedPosts.filter(p => p.id !== featured?.id);

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
