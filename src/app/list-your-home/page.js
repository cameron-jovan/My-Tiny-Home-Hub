import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'List Your Tiny Home on My Tiny Home Hub',
  description: 'Free listing service for tiny home sellers, builders, and dealers. Reach thousands of qualified buyers actively searching for tiny homes, ADUs, and alternative housing.',
  provider: {
    '@type': 'Organization',
    name: 'My Tiny Home Hub',
    url: 'https://mytinyhomehub.com',
  },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://mytinyhomehub.com/list-your-home',
  areaServed: 'US',
};

export default function ListYourHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'List Your Home' }]} />
      </div>
      <div className={styles.page}>

        {/* ===== HERO ===== */}
        <section className={styles.hero}>
          <img
            src="/images/hero-list.jpg"
            alt="Hero background"
            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,43,80,0.82) 0%, rgba(27,64,115,0.65) 60%, rgba(6,121,155,0.55) 100%)' }} aria-hidden="true" />
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Free to List</span>
            <h1 className={styles.heroTitle}>
              Your tiny home deserves<br />
              <span>the right buyers.</span>
            </h1>
            <p className={styles.heroSub}>
              Facebook Marketplace is noise. My Tiny Home Hub is a curated audience of serious, pre-educated buyers who are ready to purchase.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline-white btn-lg">
                I Already Have an Account
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>Free</span>
                <span className={styles.statLabel}>Always. No listing fees.</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>24 hrs</span>
                <span className={styles.statLabel}>From submission to live.</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>Financed</span>
                <span className={styles.statLabel}>Buyers get approved here.</span>
              </div>
            </div>
          </div>

          {/* Visual listing preview */}
          <div className={styles.heroVisual}>
            <div className={styles.listingMockup}>
              <div className={styles.mockupImg}>
                <svg width="100%" height="100%" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="240" fill="url(#houseGrad)"/>
                  <defs>
                    <linearGradient id="houseGrad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#122B50"/>
                      <stop offset="100%" stopColor="#06799B"/>
                    </linearGradient>
                  </defs>
                  {/* House silhouette */}
                  <path d="M160 180V130L200 95L240 130V180Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                  <rect x="183" y="148" width="34" height="32" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                  <rect x="168" y="130" width="20" height="16" rx="1" fill="rgba(140,197,64,0.3)" stroke="rgba(140,197,64,0.5)" strokeWidth="1"/>
                  <rect x="212" y="130" width="20" height="16" rx="1" fill="rgba(140,197,64,0.3)" stroke="rgba(140,197,64,0.5)" strokeWidth="1"/>
                  {/* Wheels */}
                  <ellipse cx="176" cy="185" rx="10" ry="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
                  <ellipse cx="224" cy="185" rx="10" ry="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
                  <line x1="150" y1="180" x2="250" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="2"/>
                  {/* Stars */}
                  <circle cx="60" cy="40" r="2" fill="rgba(255,255,255,0.3)"/>
                  <circle cx="120" cy="20" r="1.5" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="300" cy="30" r="2" fill="rgba(255,255,255,0.3)"/>
                  <circle cx="360" cy="55" r="1.5" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="340" cy="15" r="1" fill="rgba(255,255,255,0.25)"/>
                  {/* Moon */}
                  <path d="M330 50 A18 18 0 1 1 350 70 A12 12 0 1 0 330 50Z" fill="rgba(255,255,255,0.15)"/>
                </svg>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.mockupTitle}>Modern Mountain THOW</div>
                <div className={styles.mockupMeta}>
                  <span className={styles.mockupPrice}>$89,500</span>
                  <span className={styles.mockupBadge}>Financing Available</span>
                </div>
                <div className={styles.mockupDetails}>
                  <span>240 sq ft</span>
                  <span>Colorado</span>
                  <span>2023 Build</span>
                </div>
              </div>
            </div>
            <div className={styles.mockupStat}>
              <div className={styles.mockupStatItem}>
                <span className={styles.mockupStatNum}>3.2k</span>
                <span className={styles.mockupStatLabel}>Monthly buyers</span>
              </div>
              <div className={styles.mockupStatItem}>
                <span className={styles.mockupStatNum}>94%</span>
                <span className={styles.mockupStatLabel}>Inquiry rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className={styles.benefits}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why sellers choose MTHH</h2>
            <div className={styles.benefitsGrid}>
              {[
                {
                  title: 'Buyers who are actually ready',
                  desc: 'Pre-educated, pre-motivated, and increasingly pre-approved. They spend real time on listings.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  ),
                },
                {
                  title: 'Financing built in',
                  desc: 'Buyers explore chattel loans, personal loans, and RV financing directly on MTHH. A financed buyer closes.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  ),
                },
                {
                  title: 'Payments on the platform',
                  desc: 'When our integrated payment layer launches, buyers and sellers transact through MTHH: secure, tracked, and simple.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                  ),
                },
                {
                  title: 'Editorial exposure',
                  desc: 'Select homes are featured in The Tiny Edit and distributed to our newsletter audience, turning a listing into a story.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                    </svg>
                  ),
                },
                {
                  title: 'Sell faster. Sell for more.',
                  desc: 'Reach an audience that understands tiny home value. No lowball offers from uninformed buyers.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                      <polyline points="16 7 22 7 22 13"/>
                    </svg>
                  ),
                },
                {
                  title: 'Zero risk. Always free.',
                  desc: 'No subscription. No commission. List today and pull it whenever you want.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                },
              ].map((b, i) => (
                <div key={i} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{b.icon}</div>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.benefitsCta}>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Listing for Free
              </Link>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className={styles.howItWorks}>
          <div className="container">
            <h2 className={styles.sectionTitle}>From submission to live in 24 hours</h2>
            <div className={styles.steps}>
              {[
                { num: '1', title: 'Create your account', desc: 'Sign up free in under a minute.' },
                { num: '2', title: 'Submit your listing', desc: 'Tell us about your home: type, size, location, and what makes it special.' },
                { num: '3', title: 'Go live', desc: 'Your listing is published, indexed, and promoted to buyers actively searching.' },
                { num: '4', title: 'Buyers come to you', desc: 'Qualified inquiries land in your inbox. No middleman, no noise.' },
              ].map(step => (
                <div key={step.num} className={styles.step}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TYPES ===== */}
        <section className={styles.types}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What we list</h2>
            <div className={styles.typesGrid}>
              {[
                {
                  name: 'Tiny Homes on Wheels',
                  desc: 'THOWs, professionally built or custom',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 30V20L24 8l18 12v10"/>
                      <rect x="6" y="30" width="36" height="8" rx="1"/>
                      <circle cx="14" cy="38" r="4"/>
                      <circle cx="34" cy="38" r="4"/>
                      <rect x="18" y="22" width="12" height="8" rx="1"/>
                    </svg>
                  ),
                },
                {
                  name: 'ADUs and Backyard Units',
                  desc: 'Attached, detached, and garage conversions',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 40V22L14 10l10 12v18"/>
                      <path d="M24 40V28l10-10 10 10v12"/>
                      <line x1="4" y1="40" x2="44" y2="40"/>
                      <rect x="8" y="28" width="6" height="8" rx="1"/>
                      <rect x="28" y="32" width="8" height="8" rx="1"/>
                    </svg>
                  ),
                },
                {
                  name: 'Park Models',
                  desc: 'ANSI-certified park models and manufactured homes',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="20" width="40" height="20" rx="2"/>
                      <path d="M4 20l20-14 20 14"/>
                      <rect x="12" y="28" width="8" height="12" rx="1"/>
                      <rect x="28" y="28" width="8" height="8" rx="1"/>
                    </svg>
                  ),
                },
                {
                  name: 'Prefab and Modular',
                  desc: 'Factory-built homes ready for placement',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="24" width="18" height="16" rx="1"/>
                      <rect x="26" y="24" width="18" height="16" rx="1"/>
                      <rect x="4" y="8" width="18" height="12" rx="1"/>
                      <rect x="26" y="8" width="18" height="12" rx="1"/>
                    </svg>
                  ),
                },
                {
                  name: 'Off-Grid Cabins',
                  desc: 'Solar-ready, composting, and remote-capable',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 40V24L24 10l16 14v16"/>
                      <rect x="18" y="30" width="12" height="10" rx="1"/>
                      <path d="M30 6l-4 8h8l-4 8" strokeWidth="1.75"/>
                    </svg>
                  ),
                },
                {
                  name: 'Converted Spaces',
                  desc: 'Buses, containers, barns, and beyond',
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="16" width="40" height="24" rx="3"/>
                      <path d="M4 24h40"/>
                      <circle cx="12" cy="44" r="3"/>
                      <circle cx="36" cy="44" r="3"/>
                      <rect x="10" y="18" width="6" height="4" rx="1"/>
                      <rect x="21" y="18" width="6" height="4" rx="1"/>
                      <rect x="32" y="18" width="6" height="4" rx="1"/>
                    </svg>
                  ),
                },
              ].map(type => (
                <div key={type.name} className={styles.typeCard}>
                  <div className={styles.typeIconWrap}>{type.icon}</div>
                  <div>
                    <p className={styles.typeName}>{type.name}</p>
                    <p className={styles.typeDesc}>{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA ===== */}
        <section className={styles.bottomCta}>
          <div className={styles.bottomCtaInner}>
            <h2 className={styles.bottomCtaTitle}>Ready to find your buyer?</h2>
            <p className={styles.bottomCtaSub}>Two minutes to sign up. Zero dollars to list. Your next buyer is already here.</p>
            <div className={styles.bottomCtaBtns}>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Create Free Account
              </Link>
              <Link to="/login" className="btn btn-outline-white btn-lg">
                Sign In
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
