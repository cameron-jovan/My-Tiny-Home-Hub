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
    { label: 'Guides', href: '/blog' },
    { label: 'Financing', href: '/blog?category=Financing' },
    { label: 'Design', href: '/blog?category=Design' },
    { label: 'Lifestyle', href: '/blog?category=Lifestyle' },
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
          
          {user ? (
            <div className={styles.userProfile}>
              <span className={styles.userName}>{user.displayName || user.email}</span>
              <button 
                onClick={logout} 
                className={`btn btn-secondary ${styles.ctaBtn}`}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle} 
              className={`btn btn-secondary ${styles.ctaBtn}`}
            >
              Sign In
            </button>
          )}

          <Link href="/#concierge" className={`btn btn-primary ${styles.ctaBtn}`}>
            Book Tiny Home Concierge
          </Link>
        </div>

        <div className={styles.rightActions}>
          {user ? (
            <div className={styles.profileDesktop}>
              <span className={styles.userName}>{user.displayName}</span>
              <button onClick={logout} className={styles.plainBtn}>Logout</button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className={styles.plainBtn}>Login</button>
          )}
          
          <Link href="/#concierge" className={`btn btn-primary ${styles.ctaDesktop}`}>
            Book Tiny Home Concierge
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
