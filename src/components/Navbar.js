'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse', href: '/browse' },
    { label: 'Guides', href: '/blog' },
    { label: 'Financing', href: '/blog?category=Financing' },
    { label: 'Design', href: '/blog?category=Design' },
    { label: 'Lifestyle', href: '/blog?category=Lifestyle' },
    { label: 'Concierge', href: '/#concierge' },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="My Tiny Home Hub Home">
          <Image 
            src="/logo-white.png" 
            alt="My Tiny Home Hub" 
            width={180} 
            height={40}
            priority
          />
        </Link>

        <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={styles.link}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#concierge" className={`btn btn-primary ${styles.ctaBtn}`}>
            Book Tiny Home Concierge
          </Link>
        </div>

        <Link href="/#concierge" className={`btn btn-primary ${styles.ctaDesktop}`}>
          Book Tiny Home Concierge
        </Link>

        <button 
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ''}`} />
        </button>
      </div>
    </nav>
  );
}
