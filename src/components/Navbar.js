'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
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
    { label: 'Financing', href: '/blog?category=Financing' },
    { label: 'Guides', href: '/guides' },
    { label: 'Blog', href: '/blog' },
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
              key={link.href + link.label} 
              href={link.href} 
              className={styles.link}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile-only auth & CTA */}
          <hr className={styles.mobileDivider} />
          {user ? (
            <>
              <Link href="/dashboard" className={styles.link} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={logout} className="btn btn-secondary">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.link} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          )}
          <Link 
            href="/#concierge" 
            className={`btn btn-primary ${styles.ctaBtn}`}
            onClick={() => setMobileOpen(false)}
          >
            Book Concierge Service
          </Link>
        </div>

        <div className={styles.rightActions}>
          {user ? (
            <div className={styles.profileDesktop}>
              <span className={styles.userName}>
                {user.displayName || user.email?.split('@')[0]}
              </span>
              <button onClick={logout} className={styles.plainBtn}>Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className={styles.link}>Sign In</Link>
          )}

          <Link href="/#concierge" className={`btn btn-primary ${styles.ctaDesktop}`}>
            Book Concierge Service
          </Link>
        </div>

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
