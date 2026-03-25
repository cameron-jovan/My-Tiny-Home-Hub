'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://mytinyhomehub.com/list-your-home',
  areaServed: 'US',
};

export default function ListYourHomePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    sellerType: 'private',
    homeType: '',
    state: '',
    notes: '',
  });
  const [status, setStatus] = useState('idle');

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await addDoc(collection(db, 'sellerLeads'), {
        ...form,
        createdAt: serverTimestamp(),
        source: 'list-your-home',
        status: 'new',
      });
      setStatus('success');
    } catch (err) {
      console.error('Error submitting seller lead:', err);
      setStatus('error');
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Free to List</span>
              <h1 className={styles.heroTitle}>
                Your tiny home<br />
                deserves <span>the right buyers.</span>
              </h1>
              <p className={styles.heroSub}>
                Facebook Marketplace is noise. My Tiny Home Hub is a curated audience of serious buyers — pre-educated, pre-motivated, and increasingly pre-approved. Get your home in front of people who are actually ready.
              </p>
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

            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className={styles.successTitle}>You&apos;re in.</p>
                  <p className={styles.successSub}>
                    We&apos;ll reach out within one business day to get your listing live on the platform.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className={styles.formTitle}>Get your home listed today</p>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Your name</label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="First and last name"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email address</label>
                      <input
                        type="email"
                        className={styles.input}
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>I am a</label>
                      <select
                        className={styles.select}
                        value={form.sellerType}
                        onChange={e => update('sellerType', e.target.value)}
                      >
                        <option value="private">Private seller</option>
                        <option value="builder">Builder / Manufacturer</option>
                        <option value="dealer">Dealer / Retailer</option>
                        <option value="developer">Developer / Investor</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Home type</label>
                      <select
                        className={styles.select}
                        value={form.homeType}
                        onChange={e => update('homeType', e.target.value)}
                        required
                      >
                        <option value="">Select type...</option>
                        <option value="tiny-home">Tiny home (THOW)</option>
                        <option value="adu">ADU / Backyard cottage</option>
                        <option value="park-model">Park model / MH</option>
                        <option value="prefab">Prefab / Modular</option>
                        <option value="off-grid">Off-grid cabin</option>
                        <option value="converted">Converted (bus, container, etc.)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={`${styles.formGroup} ${styles.full}`}>
                      <label className={styles.label}>State / Location</label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Georgia, California"
                        value={form.state}
                        onChange={e => update('state', e.target.value)}
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.full}`}>
                      <label className={styles.label}>
                        Tell us about your home{' '}
                        <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span>
                      </label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Size, price range, standout features..."
                        value={form.notes}
                        onChange={e => update('notes', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={status === 'loading' || !form.name || !form.email || !form.homeType}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Get Started — It\'s Free'}
                  </button>
                  {status === 'error' && (
                    <p className={styles.errorMsg}>
                      Something went wrong. Email us at hello@mytinyhomehub.com
                    </p>
                  )}
                  <p className={styles.formNote}>Free to list. Live within 24 hours.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Platform Benefits */}
        <section className={styles.benefits}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why sellers choose MTHH</h2>
            <div className={styles.benefitsGrid}>
              {[
                {
                  title: 'Buyers who are actually ready',
                  desc: 'Our audience comes educated. They\'ve read our guides, explored financing, and know exactly what they want. They spend real time evaluating listings, not scrolling past them.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  ),
                },
                {
                  title: 'Financing built into the platform',
                  desc: 'Buyers can explore chattel loans, personal loans, and RV financing directly on MTHH. A financed buyer closes. An unfinanced buyer disappears.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  ),
                },
                {
                  title: 'Receive payment on the platform',
                  desc: 'When our integrated payment layer launches, buyers and sellers transact directly through MTHH — secure, tracked, and simple.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                  ),
                },
                {
                  title: 'Editorial exposure beyond the listing',
                  desc: 'Select homes are featured in The Tiny Edit, our editorial publication, and distributed to our newsletter audience — turning a listing into a story.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                    </svg>
                  ),
                },
                {
                  title: 'Sell faster. Sell for more.',
                  desc: 'Homes on MTHH reach an audience that understands tiny home value. No lowball offers from buyers who\'ve never seen a THOW before. Just qualified interest.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                      <polyline points="16 7 22 7 22 13"/>
                    </svg>
                  ),
                },
                {
                  title: 'Zero risk. Always free.',
                  desc: 'Creating a listing costs nothing. No subscription, no commission until we build that layer. List today and pull it whenever you want, no questions asked.',
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
          </div>
        </section>

        {/* How it works */}
        <section className={styles.howItWorks}>
          <div className="container">
            <h2 className={styles.sectionTitle}>From submission to live in 24 hours</h2>
            <div className={styles.steps}>
              {[
                { num: '1', title: 'Tell us about your home', desc: 'Two minutes. Name, type, location, and a note about what makes it special.' },
                { num: '2', title: 'We build your listing', desc: 'Our team creates a polished, professional listing optimized for search and discovery.' },
                { num: '3', title: 'Go live on the platform', desc: 'Your listing is published, indexed, and promoted to buyers actively searching.' },
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

        {/* Types accepted */}
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

        {/* Bottom CTA */}
        <section className={styles.bottomCta}>
          <div className={styles.bottomCtaInner}>
            <h2 className={styles.bottomCtaTitle}>Ready to find your buyer?</h2>
            <p className={styles.bottomCtaSub}>It takes two minutes. It costs nothing. Your next buyer is already here.</p>
            <a href="#top" className="btn btn-primary btn-lg" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Get Started Free
            </a>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
