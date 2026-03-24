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
    { label: 'Browse', href: '/listings' },
    { label: 'Categories', href: '/categories' },
    { label: 'Hub', href: '/blog' },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo} aria-label="My Tiny Home Hub Home">
            <Image 
              src="/logo-white.png" 
              alt="My Tiny Home Hub" 
              width={180} 
              height={40}
              priority
              className={styles.logoImage}
            />
          </Link>

          <div className={styles.desktopLinks}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.authGroup}>
            {user ? (
              <>
                <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                <div className={styles.userMenu}>
                  <div className={styles.userAvatar}>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} />
                    ) : (
                      <span>{user.email?.[0].toUpperCase()}</span>
                    )}
                  </div>
                  <button onClick={logout} className={`${styles.navBtn} btn btn-secondary`}>Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.link}>Sign In</Link>
                <Link href="/signup" className={`${styles.navBtn} btn btn-primary`}>Get Started</Link>
              </>
            )}
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
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr />
          {user ? (
            <>
              <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={logout} className="btn btn-secondary">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
