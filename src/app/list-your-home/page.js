'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './page.module.css';

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'List Your Tiny Home on My Tiny Home Hub',
    description: 'Free listing service for tiny home sellers, builders, and dealers. Reach thousands of buyers actively searching for tiny homes, ADUs, and alternative housing.',
    provider: {
      '@type': 'Organization',
      name: 'My Tiny Home Hub',
      url: 'https://mytinyhomehub.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to list your tiny home or ADU',
    },
    url: 'https://mytinyhomehub.com/list-your-home',
    areaServed: 'US',
  };

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
                Your tiny home.<br />
                <span>Thousands of buyers.</span>
              </h1>
              <p className={styles.heroSub}>
                My Tiny Home Hub is where serious buyers come to find tiny homes, ADUs, and alternative spaces. List yours for free and get in front of the right people.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>Free</span>
                  <span className={styles.statLabel}>to create your listing</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>Curated</span>
                  <span className={styles.statLabel}>audience of real buyers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>Fast</span>
                  <span className={styles.statLabel}>live in 24 hours</span>
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
                  <p className={styles.successTitle}>Application received.</p>
                  <p className={styles.successSub}>
                    We&apos;ll review your listing and reach out within one business day to get you live on the platform.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className={styles.formTitle}>Apply to list your home</p>
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
                      <label className={styles.label}>Tell us about what you&apos;re listing <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span></label>
                      <textarea
                        className={styles.textarea}
                        placeholder="Size, price, condition, standout features..."
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
                    {status === 'loading' ? 'Submitting...' : 'Apply to List — It\'s Free'}
                  </button>
                  {status === 'error' && (
                    <p style={{ color: 'var(--error)', fontSize: '0.8125rem', textAlign: 'center', marginTop: '8px' }}>
                      Something went wrong. Email us at hello@mytinyhomehub.com
                    </p>
                  )}
                  <p className={styles.formNote}>No credit card required. We review all listings before going live.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.howItWorks}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How it works</h2>
            <div className={styles.steps}>
              {[
                { num: '1', title: 'Submit your application', desc: 'Tell us about your home. Takes less than 2 minutes.' },
                { num: '2', title: 'We review and build', desc: "Our team creates a polished listing with your details and photos." },
                { num: '3', title: 'Go live on the platform', desc: 'Your listing is published and promoted to our buyer audience.' },
                { num: '4', title: 'Connect with buyers', desc: 'Qualified inquiries come directly to you — no middleman.' },
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
                { icon: '🏠', name: 'Tiny Homes on Wheels', desc: 'THOWs, professionally built or custom' },
                { icon: '🏡', name: 'ADUs and Backyard Units', desc: 'Attached, detached, and garage conversions' },
                { icon: '🚐', name: 'Park Models', desc: 'ANSI-certified park model RVs and MHs' },
                { icon: '🔧', name: 'Prefab and Modular', desc: 'Factory-built homes ready for placement' },
                { icon: '🌲', name: 'Off-Grid Cabins', desc: 'Solar-ready, composting, and remote-capable' },
                { icon: '📦', name: 'Converted Spaces', desc: 'Buses, containers, barns, and beyond' },
              ].map(type => (
                <div key={type.name} className={styles.typeCard}>
                  <span className={styles.typeIcon}>{type.icon}</span>
                  <div>
                    <p className={styles.typeName}>{type.name}</p>
                    <p className={styles.typeDesc}>{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
