import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image src="/logo-white.png" alt="My Tiny Home Hub" width={160} height={36} />
            <p className={styles.tagline}>
              The world&apos;s premier platform for tiny living discovery, financing, and delivery.
            </p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Guides</h4>
            <Link href="/blog?category=Zoning">Zoning Laws</Link>
            <Link href="/blog?category=Financing">Financing 101</Link>
            <Link href="/blog?category=Lifestyle">Off-grid Guide</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Platform</h4>
            <Link href="/browse" className={styles.activeLink}>Inventory</Link>
            <Link href="/#concierge">Sell Your Tiny</Link>
            <Link href="/#concierge">Affiliates</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Legal</h4>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a>
            <a href="tel:+14042349876">+1 (404) 234-9876</a>
            <div className={styles.social}>
              <a href="#" aria-label="Website" className={styles.socialIcon}>🌐</a>
              <a href="#" aria-label="Share" className={styles.socialIcon}>🔗</a>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>📷</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} My Tiny Home Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
