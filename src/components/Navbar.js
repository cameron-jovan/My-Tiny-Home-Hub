'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse', href: '/browse' },
    { label: 'Financing', href: '/blog?category=Financing' },
    { label: 'Guides', href: '/guides' },
    { label: 'Blog', href: '/blog' },
  ];

  const userInitial = user
    ? (user.displayName || user.email || 'U')[0].toUpperCase()
    : '';
  const displayName = user
    ? user.displayName || user.email?.split('@')[0] || 'Account'
    : '';

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="My Tiny Home Hub Home">
          <Image
            src="/logo-color.png"
            alt="My Tiny Home Hub"
            width={202}
            height={36}
            priority
          />
        </Link>

        {/* Desktop links */}
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
              <Link href="/dashboard" className={styles.link} onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-secondary">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.link} onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
          )}
          <Link
            href="/concierge"
            className={`btn btn-primary ${styles.ctaBtn}`}
            onClick={() => setMobileOpen(false)}
          >
            Get Concierge Service
          </Link>
        </div>

        {/* Desktop right actions */}
        <div className={styles.rightActions}>
          {user ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <button
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen(prev => !prev)}
                aria-label="Open user menu"
                aria-expanded={userMenuOpen}
              >
                <span className={styles.avatarInitial}>{userInitial}</span>
              </button>

              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <p className={styles.dropdownName}>Hi, {displayName}</p>
                  <Link
                    href="/dashboard"
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Profile
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className={styles.dropdownSignOut}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.link}>Sign In</Link>
          )}

          <Link href="/concierge" className={`btn btn-primary ${styles.ctaDesktop}`}>
            Get Concierge Service
          </Link>
        </div>

        {/* Hamburger */}
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
