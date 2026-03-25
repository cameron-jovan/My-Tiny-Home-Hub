'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './page.module.css';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const HOME_TYPES = [
  { id: 'thow', name: 'Tiny Home on Wheels', desc: 'THOW / mobile', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 28V20L24 9l18 11v8"/><rect x="6" y="28" width="36" height="8" rx="1"/>
      <circle cx="14" cy="36" r="4"/><circle cx="34" cy="36" r="4"/>
      <rect x="19" y="20" width="10" height="7" rx="1"/>
    </svg>
  )},
  { id: 'adu', name: 'ADU / Backyard Unit', desc: 'Attached or detached', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 40V22L14 11l10 11v18"/><path d="M24 40V29l10-9 10 9v11"/>
      <line x1="4" y1="40" x2="44" y2="40"/>
      <rect x="8" y="29" width="6" height="8" rx="1"/><rect x="29" y="33" width="8" height="7" rx="1"/>
    </svg>
  )},
  { id: 'park-model', name: 'Park Model', desc: 'ANSI-certified / MH', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="20" width="40" height="20" rx="2"/><path d="M4 20l20-13 20 13"/>
      <rect x="12" y="28" width="8" height="12" rx="1"/><rect x="28" y="28" width="8" height="8" rx="1"/>
    </svg>
  )},
  { id: 'prefab', name: 'Prefab / Modular', desc: 'Factory-built', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="24" width="18" height="16" rx="1"/><rect x="26" y="24" width="18" height="16" rx="1"/>
      <rect x="4" y="8" width="18" height="12" rx="1"/><rect x="26" y="8" width="18" height="12" rx="1"/>
    </svg>
  )},
  { id: 'off-grid', name: 'Off-Grid Cabin', desc: 'Solar / remote', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 40V24L24 10l16 14v16"/><rect x="18" y="30" width="12" height="10" rx="1"/>
      <path d="M32 7l-3.5 7H35l-3.5 7" strokeWidth="1.75"/>
    </svg>
  )},
  { id: 'converted', name: 'Converted Space', desc: 'Bus / container / barn', icon: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="16" width="40" height="24" rx="3"/><path d="M4 24h40"/>
      <circle cx="12" cy="44" r="3"/><circle cx="36" cy="44" r="3"/>
      <rect x="10" y="18" width="6" height="4" rx="1"/><rect x="21" y="18" width="6" height="4" rx="1"/><rect x="32" y="18" width="6" height="4" rx="1"/>
    </svg>
  )},
];

const YEAR_RANGES = ['Before 2015', '2015\u20132018', '2019\u20132021', '2022\u20132023', '2024+'];

const CONDITIONS = [
  { id: 'like-new', name: 'Like New', desc: 'Essentially brand new or fully restored', bars: [1,1,1,1] },
  { id: 'excellent', name: 'Excellent', desc: 'Minor wear, well maintained', bars: [1,1,1,0] },
  { id: 'good', name: 'Good', desc: 'Normal wear for age, functional', bars: [1,1,0,0] },
  { id: 'fair', name: 'Fair', desc: 'Visible wear, may need updates', bars: [1,0,0,0] },
];

const FEATURES = [
  'Solar panels', 'Off-grid system', 'Custom build', 'THOW certified',
  'Loft bedroom', 'Full bathroom', 'Outdoor deck', 'Detached garage',
  'Utilities included', 'Smart home tech', 'Steel frame', 'Metal roof',
];

const TOTAL_STEPS = 6;

function fmt(n) {
  return '$' + n.toLocaleString('en-US');
}

export default function WhatsMine() {
  const [step, setStep] = useState(1);
  const [homeType, setHomeType] = useState('');
  const [sqft, setSqft] = useState(280);
  const [yearRange, setYearRange] = useState('');
  const [condition, setCondition] = useState('');
  const [state, setState] = useState('');
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Email capture (soft, post-result)
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureName, setCaptureName] = useState('');
  const [captureSaved, setCaptureSaved] = useState(false);
  const [captureLoading, setCaptureLoading] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  function toggleFeature(f) {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  async function calculateValuation() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeType, sqft, yearRange, condition, state, features }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function saveEmailCapture(e) {
    e.preventDefault();
    if (!captureEmail || captureLoading) return;
    setCaptureLoading(true);
    try {
      await addDoc(collection(db, 'valuationLeads'), {
        name: captureName,
        email: captureEmail,
        homeType, sqft, yearRange, condition, state, features,
        valuationLow: result.low,
        valuationMid: result.mid,
        valuationHigh: result.high,
        createdAt: serverTimestamp(),
      });
      setCaptureSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setCaptureLoading(false);
    }
  }

  function share(platform) {
    const url = 'https://mytinyhomehub.com/whats-my-tiny-worth';
    const text = `My tiny home was valued at ${fmt(result.mid)} by the AI tool at My Tiny Home Hub. What's yours worth?`;
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    window.open(links[platform], '_blank', 'noopener,noreferrer');
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "What's My Tiny Home Worth? — Free Valuation Tool",
    description: 'The first AI-powered tiny home valuation tool. Get an instant estimate of your tiny home, ADU, or alternative space value.',
    url: 'https://mytinyhomehub.com/whats-my-tiny-worth',
    applicationCategory: 'RealEstateApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <div className={styles.shell}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '95%' }} /></div>
            <div className={styles.stepContent}>
              <div className={styles.loading}>
                <div className={styles.loadingDots}><span/><span/><span/></div>
                <p className={styles.loadingText}>Analyzing your home against current market data...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (result) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <div className={styles.page}>
          <div className={styles.results}>
            <p className={styles.resultsEyebrow}>Your Valuation</p>
            <h1 className={styles.resultsTitle}>
              Based on market data, your {HOME_TYPES.find(h => h.id === homeType)?.name.toLowerCase()} is estimated at
            </h1>

            <div className={styles.valuationCard}>
              <p className={styles.valuationLabel}>Estimated Market Value</p>
              <p className={styles.valuationMid}><span>{fmt(result.mid)}</span></p>

              <div className={styles.rangeBar}>
                <div className={styles.rangeBarFill} />
                <div className={styles.rangeBarMid} />
              </div>
              <div className={styles.rangeLabels}>
                <div className={styles.rangeLabel}>
                  <span className={styles.rangeLabelAmount}>{fmt(result.low)}</span>
                  <span className={styles.rangeLabelText}>Conservative</span>
                </div>
                <div className={styles.rangeLabel}>
                  <span className={styles.rangeLabelAmount}>{fmt(result.high)}</span>
                  <span className={styles.rangeLabelText}>Optimistic</span>
                </div>
              </div>
              <span className={styles.confidenceBadge}>{result.confidence} confidence estimate</span>
            </div>

            <div className={styles.factors}>
              {result.factors.map((f, i) => (
                <div key={i} className={styles.factor}>
                  <p className={styles.factorNum}>Factor {i + 1}</p>
                  <p className={styles.factorText}>{f}</p>
                </div>
              ))}
            </div>

            {result.recommendation && (
              <div className={styles.recommendation}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>{result.recommendation}</p>
              </div>
            )}

            {/* Social sharing */}
            <div className={styles.shareSection}>
              <p className={styles.shareLabel}>Share your result</p>
              <div className={styles.shareBtns}>
                <button className={styles.shareBtn} onClick={() => share('facebook')} aria-label="Share on Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  Facebook
                </button>
                <button className={styles.shareBtn} onClick={() => share('twitter')} aria-label="Share on X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X / Twitter
                </button>
                <button className={styles.shareBtn} onClick={() => share('threads')} aria-label="Share on Threads">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.327-.009 2.519-.195 3.553-.554 1.29-.447 2.312-1.178 3.036-2.17l1.65 1.179c-.905 1.27-2.21 2.268-3.88 2.861-1.289.448-2.73.685-4.358.803zm8.593-11.79h-8.59v-2.04h10.63c.065.556.098 1.125.098 1.704-.001 4.645-1.31 7.86-3.9 9.553l-1.647-1.176c2.086-1.37 3.05-3.857 3.409-8.04z"/></svg>
                  Threads
                </button>
              </div>
            </div>

            {/* Email capture (soft) */}
            <div className={styles.emailCapture}>
              {captureSaved ? (
                <p className={styles.emailCaptureConfirm}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Report saved to your inbox.
                </p>
              ) : (
                <>
                  <p className={styles.emailCaptureLabel}>Want a copy sent to your inbox?</p>
                  <form className={styles.emailCaptureForm} onSubmit={saveEmailCapture}>
                    <input
                      type="text"
                      className={styles.emailCaptureInput}
                      placeholder="Your name"
                      value={captureName}
                      onChange={e => setCaptureName(e.target.value)}
                    />
                    <input
                      type="email"
                      className={styles.emailCaptureInput}
                      placeholder="Email address"
                      value={captureEmail}
                      onChange={e => setCaptureEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className={styles.emailCaptureBtn}
                      disabled={!captureEmail || captureLoading}
                    >
                      {captureLoading ? 'Saving...' : 'Send Me a Copy'}
                    </button>
                  </form>
                  <p className={styles.emailCaptureNote}>No spam. Unsubscribe anytime.</p>
                </>
              )}
            </div>

            <div className={styles.resultsCta}>
              <div className={styles.resultsCtaCopy}>
                <h3>Ready to find your buyer?</h3>
                <p>List your home on MTHH for free and reach buyers who are ready to purchase.</p>
              </div>
              <div className={styles.resultsCtaBtn}>
                <Link href="/list-your-home" className="btn btn-primary btn-lg">
                  List Your Home Free
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>

          <div className={styles.stepHeader}>
            {step > 1 ? (
              <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back
              </button>
            ) : <span />}
            <span className={styles.stepCount}>{step} of {TOTAL_STEPS}</span>
          </div>

          <div className={styles.stepContent}>

            {/* Step 1: Home Type */}
            {step === 1 && (
              <>
                <h1 className={styles.question}>What type of home do you have?</h1>
                <div className={styles.typeGrid}>
                  {HOME_TYPES.map(t => (
                    <div
                      key={t.id}
                      className={`${styles.typeCard} ${homeType === t.id ? styles.selected : ''}`}
                      onClick={() => { setHomeType(t.id); setTimeout(() => setStep(2), 220); }}
                    >
                      <div className={styles.typeCardIcon}>{t.icon}</div>
                      <p className={styles.typeCardName}>{t.name}</p>
                      <p className={styles.typeCardDesc}>{t.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Size */}
            {step === 2 && (
              <>
                <h1 className={styles.question}>How big is it?</h1>
                <p className={styles.questionSub}>Approximate interior square footage</p>
                <div className={styles.sizeDisplay}>
                  <span className={styles.sizeBig}>{sqft}</span>
                  <span className={styles.sizeUnit}>sq ft</span>
                </div>
                <div className={styles.sliderWrap}>
                  <input
                    type="range"
                    min={80}
                    max={1000}
                    step={10}
                    value={sqft}
                    onChange={e => setSqft(Number(e.target.value))}
                    className={styles.slider}
                  />
                  <div className={styles.sliderLabels}>
                    <span>80 sq ft</span>
                    <span>1,000 sq ft</span>
                  </div>
                </div>
                <button className={styles.nextBtn} onClick={() => setStep(3)}>Continue</button>
              </>
            )}

            {/* Step 3: Year */}
            {step === 3 && (
              <>
                <h1 className={styles.question}>When was it built?</h1>
                <div className={styles.yearGrid}>
                  {YEAR_RANGES.map(y => (
                    <div
                      key={y}
                      className={`${styles.yearChip} ${yearRange === y ? styles.selected : ''}`}
                      onClick={() => { setYearRange(y); setTimeout(() => setStep(4), 220); }}
                    >
                      {y}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Condition */}
            {step === 4 && (
              <>
                <h1 className={styles.question}>What&apos;s the condition?</h1>
                <div className={styles.conditionGrid}>
                  {CONDITIONS.map(c => (
                    <div
                      key={c.id}
                      className={`${styles.conditionCard} ${condition === c.id ? styles.selected : ''}`}
                      onClick={() => { setCondition(c.id); setTimeout(() => setStep(5), 220); }}
                    >
                      <div className={styles.conditionBar}>
                        {c.bars.map((active, i) => (
                          <span key={i} style={{ height: `${(i + 1) * 8}px`, opacity: active ? 1 : 0.2 }} />
                        ))}
                      </div>
                      <p className={styles.conditionName}>{c.name}</p>
                      <p className={styles.conditionDesc}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 5: Location */}
            {step === 5 && (
              <>
                <h1 className={styles.question}>Where is it located?</h1>
                <p className={styles.questionSub}>Location has a significant impact on market value</p>
                <div className={styles.locationWrap}>
                  <select
                    className={styles.locationSelect}
                    value={state}
                    onChange={e => setState(e.target.value)}
                  >
                    <option value="">Select a state...</option>
                    {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button className={styles.nextBtn} disabled={!state} onClick={() => setStep(6)} style={{ display: 'block', margin: '24px auto 0' }}>
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* Step 6: Features */}
            {step === 6 && (
              <>
                <h1 className={styles.question}>Any standout features?</h1>
                <p className={styles.questionSub}>Select all that apply — these affect your value</p>
                <div className={styles.featuresWrap}>
                  {FEATURES.map(f => (
                    <div
                      key={f}
                      className={`${styles.featureChip} ${features.includes(f) ? styles.selected : ''}`}
                      onClick={() => toggleFeature(f)}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {f}
                    </div>
                  ))}
                </div>
                {error && <p style={{ color: 'var(--error)', fontSize: '0.875rem', textAlign: 'center', marginTop: '16px' }}>{error}</p>}
                <button className={styles.nextBtn} onClick={calculateValuation} style={{ marginTop: '32px' }}>
                  {features.length > 0 ? `Get My Valuation` : 'Get My Valuation'}
                </button>
              </>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
