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
              Less Home, More Living. The marketplace for tiny homes, ADUs, and alternative living.
            </p>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Guides</h4>
            <Link href="/guides">Technical Guides</Link>
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
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a>
            <a href="tel:+14042349876">+1 (404) 234-9876</a>
            <div className={styles.social}>
              <a href="https://facebook.com/mytinyhomehub" aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/mytinyhomehub" aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://tiktok.com/@mytinyhomehub.com" aria-label="TikTok" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.2 8.2 0 004.79 1.53V7.03a4.85 4.85 0 01-1.02-.34z"/></svg>
              </a>
              <a href="https://pinterest.com/mytinyhomehub" aria-label="Pinterest" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
              <a href="https://youtube.com/@mytinyhomehub" aria-label="YouTube" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
              <a href="https://threads.net/@mytinyhomehub" aria-label="Threads" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.327-.009 2.519-.195 3.553-.554 1.29-.447 2.312-1.178 3.036-2.17l1.65 1.179c-.905 1.27-2.21 2.268-3.88 2.861-1.289.448-2.73.685-4.358.803zm8.593-11.79h-8.59v-2.04h10.63c.065.556.098 1.125.098 1.704-.001 4.645-1.31 7.86-3.9 9.553l-1.647-1.176c2.086-1.37 3.05-3.857 3.409-8.04z"/></svg>
              </a>
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
