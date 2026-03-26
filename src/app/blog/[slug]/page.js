import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import EditorialCard from '@/components/EditorialCard';
import { seedPosts } from '@/lib/seedData';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

export function generateStaticParams() {
  return seedPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = seedPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | My Tiny Home Hub`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = seedPosts.find(p => p.slug === slug);
  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-height)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Article Not Found</h1>
            <p style={{ marginTop: '16px' }}>
              <Link to="/blog" className="btn btn-secondary">View All Articles</Link>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = seedPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post?.title || 'Post' }]} />
      </div>
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>
            <span className={styles.tag}>{post.category}</span>
            <h1>{post.title}</h1>
            <div className={styles.meta}>
              <span>By {post.author}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>April 2026</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className={styles.article}>
          <div className="container">
            <div className={styles.articleInner}>
              <div className={styles.prose}>
                <p className={styles.lede}>{post.excerpt}</p>
                <h2>Introduction</h2>
                <p>
                  {post.body || `The tiny home movement has reshaped the way Americans think about housing. Whether you're exploring tiny homes on wheels, modular ADUs, or container homes, the path to ownership requires careful research and planning.`}
                </p>
                <p>
                  This comprehensive guide covers everything you need to know about {post.title.toLowerCase()}, from initial planning to final implementation. We'll walk through practical steps, expert tips, and real-world examples to help you make informed decisions.
                </p>
                <h2>Key Considerations</h2>
                <p>
                  Before diving in, it's important to understand the landscape. Recent data shows that the tiny home market has grown by 67% over the past five years, with average home prices ranging from $45,000 to $150,000 depending on size, features, and location.
                </p>
                <ul>
                  <li>Research local zoning regulations and building codes</li>
                  <li>Understand financing options specific to alternative housing</li>
                  <li>Consider both DIY and professional builder options</li>
                  <li>Plan for utilities, especially if going off-grid</li>
                  <li>Factor in land costs and site preparation</li>
                </ul>
                <h2>Expert Recommendations</h2>
                <p>
                  Our team of tiny home experts and industry partners have compiled their top recommendations based on years of experience helping families transition to tiny living.
                </p>
                <blockquote>
                  &ldquo;The best time to start your tiny home journey is now. With financing options more accessible than ever and building technology advancing rapidly, there's never been a better time to downsize and upgrade your quality of life.&rdquo;
                </blockquote>
                <h2>Next Steps</h2>
                <p>
                  Ready to take the next step? Browse our curated marketplace for available tiny homes, or speak with one of our concierge experts who can guide you through the entire process from selection to delivery.
                </p>
              </div>
              <aside className={styles.articleSidebar}>
                <div className={styles.tocCard}>
                  <h4>In This Article</h4>
                  <ul>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#key-considerations">Key Considerations</a></li>
                    <li><a href="#expert-recommendations">Expert Recommendations</a></li>
                    <li><a href="#next-steps">Next Steps</a></li>
                  </ul>
                </div>
                <div className={styles.ctaCard}>
                  <h4>Need Expert Help?</h4>
                  <p>Our concierge team specializes in matching buyers with their perfect tiny home.</p>
                  <Link to="/concierge" className="btn btn-primary" style={{ width: '100%' }}>
                    Book a Call
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 style={{ marginBottom: 'var(--space-xl)' }}>Related Stories</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <EditorialCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>

        <Newsletter variant="dark" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": { "@type": "Person", "name": post.author },
            "publisher": {
              "@type": "Organization",
              "name": "My Tiny Home Hub",
              "url": "https://mytinyhomehub.com"
            }
          })
        }}
      />
    </>
  );
}
