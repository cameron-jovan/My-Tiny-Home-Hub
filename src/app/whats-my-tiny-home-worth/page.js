'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

const HOME_TYPES = [
  {
    id: 'thow', name: 'THOW', desc: 'Tiny Home on Wheels',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 28V20L24 9l18 11v8"/><rect x="6" y="28" width="36" height="8" rx="1"/>
        <circle cx="14" cy="36" r="4"/><circle cx="34" cy="36" r="4"/>
        <rect x="19" y="20" width="10" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'converted', name: 'Container Home', desc: 'Shipping container conversion',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="40" height="24" rx="3"/>
        <line x1="4" y1="26" x2="44" y2="26"/>
        <rect x="10" y="16" width="6" height="5" rx="1"/>
        <rect x="21" y="16" width="6" height="5" rx="1"/>
        <rect x="32" y="16" width="6" height="5" rx="1"/>
        <line x1="18" y1="14" x2="18" y2="38"/>
        <line x1="30" y1="14" x2="30" y2="38"/>
      </svg>
    ),
  },
  {
    id: 'off-grid', name: 'Off-Grid Ready', desc: 'Solar, composting, water capture', featured: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40V24L24 10l16 14v16"/>
        <rect x="18" y="30" width="12" height="10" rx="1"/>
        <path d="M32 7l-3.5 7H35l-3.5 7" strokeWidth="1.75"/>
      </svg>
    ),
  },
  {
    id: 'adu', name: 'ADU / Foundation', desc: 'Backyard units and permanent',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 40V22L14 11l10 11v18"/>
        <path d="M24 40V29l10-9 10 9v11"/>
        <line x1="4" y1="40" x2="44" y2="40"/>
        <rect x="8" y="29" width="6" height="8" rx="1"/>
        <rect x="29" y="33" width="8" height="7" rx="1"/>
      </svg>
    ),
  },
];

const YEAR_RANGES = ['Before 2015', '2015\u20132018', '2019\u20132021', '2022\u20132023', '2024+'];

const CONDITIONS = [
  { id: 'like-new', name: 'Like New', desc: 'Brand new or fully restored', bars: [1,1,1,1] },
  { id: 'excellent', name: 'Excellent', desc: 'Minor wear, well maintained', bars: [1,1,1,0] },
  { id: 'good', name: 'Good', desc: 'Normal wear for age', bars: [1,1,0,0] },
  { id: 'fair', name: 'Fair', desc: 'Visible wear, needs updates', bars: [1,0,0,0] },
];

const FEATURES = [
  'Solar panels', 'Off-grid system', 'Custom build', 'THOW certified',
  'Loft bedroom', 'Full bathroom', 'Outdoor deck', 'Smart home tech',
  'Steel frame', 'Metal roof', 'Utilities included', 'Detached garage',
];

const STEPS = ['Home Type', 'Size & Age', 'Specifics', 'Features', 'Your Results'];

function fmt(n) {
  return '$' + n.toLocaleString('en-US');
}

export default function WhatsMine() {
  const wizardRef = useRef(null);
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
  // Email gate (step 5 — required before results)
  const [gateEmail, setGateEmail] = useState('');
  const [gateName, setGateName] = useState('');
  const [gateLoading, setGateLoading] = useState(false);
  // Post-result soft share (already saved via gate)
  const [captureSaved, setCaptureSaved] = useState(false);

  function scrollToWizard() {
    wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
      setTimeout(() => wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
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
        name: captureName, email: captureEmail,
        homeType, sqft, yearRange, condition, state, features,
        valuationLow: result.low, valuationMid: result.mid, valuationHigh: result.high,
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
    const url = 'https://mytinyhomehub.com/whats-my-tiny-home-worth';
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
    name: "What's My Tiny Home Worth? — Free AI Valuation Tool",
    description: 'The first AI-powered tiny home valuation tool. Get an instant estimate of your tiny home, ADU, or alternative space value.',
    url: 'https://mytinyhomehub.com/whats-my-tiny-home-worth',
    applicationCategory: 'RealEstateApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  // ── Wizard card content ──────────────────────────────────────────────────────
  function WizardContent() {
    if (loading) {
      return (
        <div className={styles.loadingCard}>
          <div className={styles.loadingDots}><span/><span/><span/></div>
          <p className={styles.loadingTitle}>Analyzing your home...</p>
          <p className={styles.loadingSubtitle}>Comparing against current market data across 50 states</p>
        </div>
      );
    }

    if (result) {
      return (
        <div className={styles.resultCard}>
          <p className={styles.resultEyebrow}>Your Valuation</p>
          <div className={styles.valuationCard}>
            <p className={styles.resultLabel}>Estimated Market Value</p>
            <p className={styles.resultMid}>{fmt(result.mid)}</p>
            <div className={styles.rangeBar}>
              <div className={styles.rangeBarFill} />
              <div className={styles.rangeBarMid} />
            </div>
            <div className={styles.rangeRow}>
              <div className={styles.rangeEnd}>
                <span className={styles.rangeAmount}>{fmt(result.low)}</span>
                <span className={styles.rangeText}>Conservative</span>
              </div>
              <span className={styles.confidenceBadge}>{result.confidence} confidence</span>
              <div className={styles.rangeEnd} style={{ textAlign: 'right' }}>
                <span className={styles.rangeAmount}>{fmt(result.high)}</span>
                <span className={styles.rangeText}>Optimistic</span>
              </div>
            </div>
          </div>

          <div className={styles.factorGrid}>
            {result.factors.map((f, i) => (
              <div key={i} className={styles.factorItem}>
                <span className={styles.factorLabel}>Factor {i + 1}</span>
                <span className={styles.factorText}>{f}</span>
              </div>
            ))}
          </div>

          {result.recommendation && (
            <div className={styles.reco}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--teal)', marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>{result.recommendation}</p>
            </div>
          )}

          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share your result:</span>
            <div className={styles.shareBtns}>
              <button className={styles.shareBtn} onClick={() => share('facebook')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </button>
              <button className={styles.shareBtn} onClick={() => share('twitter')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button className={styles.shareBtn} onClick={() => share('threads')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 1.327-.009 2.519-.195 3.553-.554 1.29-.447 2.312-1.178 3.036-2.17l1.65 1.179c-.905 1.27-2.21 2.268-3.88 2.861-1.289.448-2.73.685-4.358.803zm8.593-11.79h-8.59v-2.04h10.63c.065.556.098 1.125.098 1.704-.001 4.645-1.31 7.86-3.9 9.553l-1.647-1.176c2.086-1.37 3.05-3.857 3.409-8.04z"/></svg>
              </button>
            </div>
          </div>

          <div className={styles.emailCap}>
            {captureSaved ? (
              <p className={styles.emailCapSaved}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Report saved to your inbox.
              </p>
            ) : (
              <>
                <p className={styles.emailCapLabel}>Want a copy sent to your inbox?</p>
                <form className={styles.emailCapForm} onSubmit={saveEmailCapture}>
                  <input type="text" className={styles.emailCapInput} placeholder="Name" value={captureName} onChange={e => setCaptureName(e.target.value)} />
                  <input type="email" className={styles.emailCapInput} placeholder="Email address" value={captureEmail} onChange={e => setCaptureEmail(e.target.value)} required />
                  <button type="submit" className={styles.emailCapBtn} disabled={!captureEmail || captureLoading}>
                    {captureLoading ? 'Saving...' : 'Send Me a Copy'}
                  </button>
                </form>
              </>
            )}
          </div>
          <div className={styles.resultListCta}>
            <p className={styles.resultListCtaText}>Ready to act on your valuation?</p>
            <a href="/list-your-home" className={styles.resultListCtaBtn}>List Your Home Free →</a>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={styles.wizardProgress}>
          {STEPS.map((label, i) => (
            <div key={i} className={`${styles.progressStep} ${step > i ? styles.progressActive : ''} ${step === i + 1 ? styles.progressCurrent : ''}`}>
              <div className={styles.progressDot}>{step > i + 1 ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : i + 1}</div>
              <span className={styles.progressLabel}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.wizardBody}>
          {/* Step 1: Home Type */}
          {step === 1 && (
            <>
              <h2 className={styles.wizardQ}>What type of home are you valuing?</h2>
              <p className={styles.wizardSub}>Select the category that best describes your property.</p>
              <div className={styles.typeGrid}>
                {HOME_TYPES.map(t => (
                  <div
                    key={t.id}
                    className={`${styles.typeCard} ${homeType === t.id ? styles.typeSelected : ''}`}
                    onClick={() => { setHomeType(t.id); setTimeout(() => setStep(2), 220); }}
                  >
                    {t.featured && <span className={styles.featuredTag}>Featured</span>}
                    <div className={styles.typeIcon}>{t.icon}</div>
                    <p className={styles.typeName}>{t.name}</p>
                    <p className={styles.typeDesc}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Size + Year */}
          {step === 2 && (
            <>
              <h2 className={styles.wizardQ}>Size &amp; when it was built?</h2>
              <p className={styles.wizardSub}>Drag to set square footage, then select the build year.</p>
              <div className={styles.sizeBox}>
                <span className={styles.sizeNum}>{sqft}</span>
                <span className={styles.sizeUnit}>sq ft</span>
              </div>
              <div className={styles.sliderWrap}>
                <input
                  type="range" min={80} max={1000} step={10}
                  value={sqft} onChange={e => setSqft(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}><span>80 sq ft</span><span>1,000 sq ft</span></div>
              </div>
              <div className={styles.yearGrid}>
                {YEAR_RANGES.map(y => (
                  <div key={y} className={`${styles.yearChip} ${yearRange === y ? styles.yearSelected : ''}`}
                    onClick={() => setYearRange(y)}>
                    {y}
                  </div>
                ))}
              </div>
              <button className={styles.nextBtn} disabled={!yearRange} onClick={() => setStep(3)}>
                Next Step
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}

          {/* Step 3: Condition + Location */}
          {step === 3 && (
            <>
              <h2 className={styles.wizardQ}>Condition &amp; location?</h2>
              <p className={styles.wizardSub}>These two factors have the biggest impact on your estimate.</p>
              <div className={styles.condGrid}>
                {CONDITIONS.map(c => (
                  <div key={c.id}
                    className={`${styles.condCard} ${condition === c.id ? styles.condSelected : ''}`}
                    onClick={() => setCondition(c.id)}>
                    <div className={styles.condBars}>
                      {c.bars.map((on, i) => (
                        <span key={i} className={`${styles.condBar} ${on ? styles.condBarOn : ''}`} style={{ height: `${(i + 1) * 7}px` }} />
                      ))}
                    </div>
                    <p className={styles.condName}>{c.name}</p>
                    <p className={styles.condDesc}>{c.desc}</p>
                  </div>
                ))}
              </div>
              <div className={styles.stateWrap}>
                <select className={styles.stateSelect} value={state} onChange={e => setState(e.target.value)}>
                  <option value="">Select your state...</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button className={styles.nextBtn} disabled={!condition || !state} onClick={() => setStep(4)}>
                Next Step
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}

          {/* Step 4: Features */}
          {step === 4 && (
            <>
              <h2 className={styles.wizardQ}>Any standout features?</h2>
              <p className={styles.wizardSub}>Select all that apply. Each one affects your valuation.</p>
              <div className={styles.featuresGrid}>
                {FEATURES.map(f => (
                  <div key={f}
                    className={`${styles.featureChip} ${features.includes(f) ? styles.featureOn : ''}`}
                    onClick={() => toggleFeature(f)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {f}
                  </div>
                ))}
              </div>
              {error && <p className={styles.wizardError}>{error}</p>}
              <button className={styles.valuationBtn} onClick={calculateValuation}>
                Get My Valuation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        {/* SVG Illustration */}
        <svg className={styles.heroSvg} viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="wv-sky" x1="0" y1="0" x2="0" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#040A14"/>
              <stop offset="35%" stopColor="#0B1B38"/>
              <stop offset="65%" stopColor="#163355"/>
              <stop offset="82%" stopColor="#6B3518"/>
              <stop offset="100%" stopColor="#C4521A"/>
            </linearGradient>
            <linearGradient id="wv-win" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#FFD060"/>
              <stop offset="100%" stopColor="#FF7A10"/>
            </linearGradient>
            <radialGradient id="wv-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9020" stopOpacity="0.35"/>
              <stop offset="100%" stopColor="#FF5010" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="wv-horizglow" cx="50%" cy="10%" r="90%">
              <stop offset="0%" stopColor="#FF6820" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#FF3010" stopOpacity="0"/>
            </radialGradient>
            <filter id="wv-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14"/>
            </filter>
            <filter id="wv-softblur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6"/>
            </filter>
          </defs>

          {/* Sky */}
          <rect width="1440" height="700" fill="url(#wv-sky)"/>
          {/* Horizon glow */}
          <ellipse cx="720" cy="540" rx="700" ry="160" fill="url(#wv-horizglow)" filter="url(#wv-blur)"/>

          {/* Stars */}
          {[
            [90,45,1.8,0.9],[200,28,1.2,0.6],[310,60,1.5,0.7],[450,22,1,0.5],
            [540,50,1.8,0.85],[660,18,1.2,0.6],[800,38,1.5,0.75],[950,15,1,0.55],
            [1050,42,1.8,0.8],[1160,24,1.2,0.6],[1280,55,1.5,0.7],[1380,30,1,0.5],
            [148,100,1,0.4],[370,115,1.3,0.5],[620,88,1.1,0.45],[850,95,1.4,0.55],
            [1100,78,1.2,0.5],[1330,105,1,0.4],[70,145,0.8,0.35],[490,130,1,0.4],
          ].map(([cx,cy,r,op], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={op}/>
          ))}

          {/* Moon (crescent) */}
          <circle cx="1260" cy="85" r="46" fill="#EADDA8" opacity="0.92"/>
          <circle cx="1241" cy="74" r="39" fill="#0B1B38"/>

          {/* Far mountains */}
          <path d="M0,510 C80,440 160,460 240,395 C320,330 390,355 470,300 C550,245 620,268 700,308 C780,348 820,320 900,278 C980,236 1060,262 1150,305 C1240,348 1300,330 1380,372 L1440,410 L1440,700 L0,700Z" fill="#0C1B2E" opacity="0.88"/>
          {/* Mid mountains */}
          <path d="M0,565 C70,510 140,530 200,478 C260,426 305,450 360,416 C415,382 455,405 510,384 C565,363 608,386 660,372 C712,358 745,378 800,392 C855,406 888,390 935,406 C982,422 1020,408 1068,424 C1116,440 1155,428 1210,455 C1265,482 1340,498 1440,530 L1440,700 L0,700Z" fill="#081420" opacity="0.96"/>
          {/* Ground */}
          <rect x="0" y="548" width="1440" height="152" fill="#050F0A"/>
          {/* Ground highlight */}
          <path d="M0,548 C300,543 600,550 900,545 C1100,541 1280,547 1440,544 L1440,560 C1200,563 900,557 600,561 C300,565 100,559 0,562Z" fill="#0A1E10"/>

          {/* Left trees */}
          <path d="M100,548 L128,458 L156,548Z" fill="#060F08"/>
          <path d="M88,504 L128,410 L168,504Z" fill="#081408"/>
          <path d="M78,466 L128,360 L178,466Z" fill="#0A1A0B"/>
          <path d="M68,428 L128,315 L188,428Z" fill="#0C1E0D"/>
          <path d="M230,548 L252,480 L274,548Z" fill="#060F08"/>
          <path d="M220,514 L252,442 L284,514Z" fill="#081408"/>
          <path d="M210,484 L252,402 L294,484Z" fill="#0A1A0B"/>
          <path d="M360,548 L378,492 L396,548Z" fill="#060F08"/>
          <path d="M350,516 L378,458 L406,516Z" fill="#081408"/>
          <path d="M340,488 L378,424 L416,488Z" fill="#0A1A0B"/>
          <path d="M468,548 L482,502 L496,548Z" fill="#060F08"/>
          <path d="M460,522 L482,474 L504,522Z" fill="#081408"/>

          {/* Right trees */}
          <path d="M1290,548 L1318,458 L1346,548Z" fill="#060F08"/>
          <path d="M1278,504 L1318,410 L1358,504Z" fill="#081408"/>
          <path d="M1268,466 L1318,360 L1368,466Z" fill="#0A1A0B"/>
          <path d="M1258,428 L1318,315 L1378,428Z" fill="#0C1E0D"/>
          <path d="M1150,548 L1172,480 L1194,548Z" fill="#060F08"/>
          <path d="M1140,514 L1172,442 L1204,514Z" fill="#081408"/>
          <path d="M1130,484 L1172,402 L1214,484Z" fill="#0A1A0B"/>
          <path d="M1040,548 L1056,498 L1072,548Z" fill="#060F08"/>
          <path d="M1030,518 L1056,464 L1082,518Z" fill="#081408"/>

          {/* Window glow halos */}
          <ellipse cx="685" cy="472" rx="55" ry="40" fill="url(#wv-glow)" filter="url(#wv-blur)"/>
          <ellipse cx="800" cy="472" rx="55" ry="40" fill="url(#wv-glow)" filter="url(#wv-blur)"/>

          {/* Trailer axle */}
          <rect x="498" y="526" width="444" height="14" rx="3" fill="#2E2E2E"/>
          {/* Hitch */}
          <path d="M498,533 L452,542 L452,526 L498,526Z" fill="#3A3A3A"/>

          {/* Wheels */}
          <circle cx="572" cy="540" r="22" fill="#161616" stroke="#2C2C2C" strokeWidth="3"/>
          <circle cx="572" cy="540" r="9" fill="#242424"/>
          <circle cx="868" cy="540" r="22" fill="#161616" stroke="#2C2C2C" strokeWidth="3"/>
          <circle cx="868" cy="540" r="9" fill="#242424"/>

          {/* Home body */}
          <rect x="505" y="408" width="430" height="122" rx="4" fill="#EEEAD8"/>
          {/* Siding lines */}
          {[428,448,468,488,508].map((y, i) => (
            <line key={i} x1="505" y1={y} x2="935" y2={y} stroke="#D8D4C0" strokeWidth="0.8" opacity="0.6"/>
          ))}

          {/* Left window frame + glass */}
          <rect x="535" y="422" width="108" height="82" rx="4" fill="#3A2818"/>
          <rect x="539" y="426" width="100" height="74" rx="2" fill="url(#wv-win)"/>
          <line x1="589" y1="426" x2="589" y2="500" stroke="#2A1A10" strokeWidth="2" opacity="0.7"/>
          <line x1="539" y1="463" x2="639" y2="463" stroke="#2A1A10" strokeWidth="2" opacity="0.7"/>
          {/* Window inner highlight */}
          <rect x="541" y="428" width="46" height="33" rx="1" fill="white" opacity="0.08"/>

          {/* Center small window */}
          <rect x="663" y="428" width="74" height="68" rx="4" fill="#3A2818"/>
          <rect x="667" y="432" width="66" height="60" rx="2" fill="url(#wv-win)" opacity="0.92"/>
          <line x1="700" y1="432" x2="700" y2="492" stroke="#2A1A10" strokeWidth="2" opacity="0.6"/>
          <rect x="669" y="434" width="29" height="26" rx="1" fill="white" opacity="0.07"/>

          {/* Door */}
          <rect x="770" y="448" width="62" height="82" rx="3" fill="#5E3C22"/>
          <rect x="774" y="452" width="54" height="78" rx="2" fill="#4E3018"/>
          <circle cx="822" cy="492" r="4.5" fill="#9A6C38"/>
          {/* Door step */}
          <rect x="765" y="526" width="72" height="8" rx="2" fill="#4A3020"/>

          {/* Right window */}
          <rect x="848" y="422" width="78" height="62" rx="4" fill="#3A2818"/>
          <rect x="852" y="426" width="70" height="54" rx="2" fill="url(#wv-win)" opacity="0.88"/>
          <line x1="887" y1="426" x2="887" y2="480" stroke="#2A1A10" strokeWidth="2" opacity="0.6"/>
          <rect x="854" y="428" width="31" height="24" rx="1" fill="white" opacity="0.07"/>

          {/* Roof */}
          <path d="M482,410 L720,290 L958,410Z" fill="#181818"/>
          {/* Roof ridge line */}
          <line x1="482" y1="410" x2="720" y2="290" stroke="#0A0A0A" strokeWidth="2.5"/>
          <line x1="720" y1="290" x2="958" y2="410" stroke="#0A0A0A" strokeWidth="2.5"/>
          {/* Eave trim */}
          <rect x="478" y="407" width="484" height="8" rx="2" fill="#0E0E0E"/>

          {/* Chimney */}
          <rect x="796" y="293" width="30" height="72" fill="#222"/>
          <rect x="792" y="289" width="38" height="10" rx="1" fill="#2A2A2A"/>
          {/* Smoke wisps */}
          <circle cx="811" cy="272" r="13" fill="#2A3040" opacity="0.28"/>
          <circle cx="818" cy="248" r="17" fill="#2A3040" opacity="0.18"/>
          <circle cx="806" cy="224" r="22" fill="#2A3040" opacity="0.10"/>

          {/* Solar panel */}
          <rect x="720" y="325" width="118" height="68" rx="3" fill="#182840" stroke="#204080" strokeWidth="1.5"/>
          {[344,363,382].map((y,i) => <line key={i} x1="720" y1={y} x2="838" y2={y} stroke="#204070" strokeWidth="0.8"/>)}
          {[746,773,800].map((x,i) => <line key={i} x1={x} y1="325" x2={x} y2="393" stroke="#204070" strokeWidth="0.8"/>)}

          {/* Loft window above main body */}
          <rect x="660" y="332" width="64" height="48" rx="3" fill="#3A2818" opacity="0.85"/>
          <rect x="664" y="336" width="56" height="40" rx="2" fill="url(#wv-win)" opacity="0.75"/>

          {/* Ground fog */}
          <rect x="0" y="520" width="1440" height="60" fill="#0B1520" opacity="0.5"/>
          {/* Warm ground reflection under home */}
          <ellipse cx="720" cy="548" rx="220" ry="18" fill="#FF6810" opacity="0.06" filter="url(#wv-softblur)"/>
        </svg>

        <div className={styles.heroOverlay}/>
        <div className={styles.heroContent}>
            <div className={styles.heroBreadcrumb}>
              <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: "What's My Tiny Home Worth?" }]} />
            </div>
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>AI-Powered Valuation</span>
            <h1 className={styles.heroH1}>
              What&apos;s Your Tiny<br />Home Worth?
            </h1>
            <p className={styles.heroSub}>
              Get an instant, data-backed valuation and see what the market is paying for homes like yours.
            </p>
            <button className={styles.heroCta} onClick={scrollToWizard}>
              Start My Free Valuation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className={styles.heroProof}>
              <span className={styles.recentBadge}>RECENTLY VALUED</span>
              <span className={styles.recentText}>A 2023 THOW in Colorado just valued at $82,000</span>
            </div>
            <p className={styles.heroJoined}>Trusted by 12,000+ tiny home owners</p>
          </div>
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </section>

      {/* ===== HOW WE CALCULATE BAR ===== */}
      <section className={styles.calcBar}>
        <div className="container">
          <div className={styles.calcBarInner}>
            <p className={styles.calcTitle}>How we calculate your value</p>
            <div className={styles.calcItems}>
              {[
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Local Market Demand', sub: 'Region-specific buyer competition levels' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>, label: 'Current Material Costs', sub: 'Live lumber and utility pricing indexes' },
                { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: 'Historical Sales Data', sub: '30+ years of verified transaction data' },
              ].map((item, i) => (
                <div key={i} className={styles.calcItem}>
                  <div className={styles.calcItemIcon}>{item.icon}</div>
                  <div>
                    <p className={styles.calcItemLabel}>{item.label}</p>
                    <p className={styles.calcItemSub}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WIZARD SECTION ===== */}
      <section className={styles.wizardSection} ref={wizardRef} id="start-valuation">
        <div className={styles.wizardCard}>
          <WizardContent />
        </div>
      </section>

      {/* ===== REAL DATA SECTION ===== */}
      <section className={styles.realData}>
        <div className="container">
          <p className={styles.rdEyebrow}>Precision Engineering</p>
          <h2 className={styles.rdTitle}>Real Data. Real Value.</h2>
          <p className={styles.rdSub}>We analyze thousands of recent sales and active listings on My Tiny Home Hub to give you the most accurate estimate in the industry.</p>
          <div className={styles.rdGrid}>
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: 'Recent Sales Data', desc: 'Comparing your home against verified closing prices of similar units in your region.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>, title: 'Market Trends', desc: 'Live tracking of demand shifts, seasonality, and the tiny home premium in urban vs. rural markets.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Home Specifics', desc: 'Accounting for high-end finishes, off-grid capabilities, and specific certifications (NOAH/RVIA).' },
            ].map((item, i) => (
              <div key={i} className={styles.rdCard}>
                <div className={styles.rdIcon}>{item.icon}</div>
                <h3 className={styles.rdCardTitle}>{item.title}</h3>
                <p className={styles.rdCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOVE FROM VALUE TO SOLD ===== */}
      <section className={styles.moveSection}>
        <div className="container">
          <div className={styles.moveSplit}>
            <div className={styles.moveVisual}>
              {/* Illustrated tiny home interior */}
              <div className={styles.moveImgBox}>
                <svg width="100%" height="100%" viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Interior scene */}
                  <rect width="500" height="380" fill="url(#mv-room)"/>
                  <defs>
                    <linearGradient id="mv-room" x1="0" y1="0" x2="500" y2="380" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#1A1008"/>
                      <stop offset="100%" stopColor="#0A0805"/>
                    </linearGradient>
                    <linearGradient id="mv-floor" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop offset="0%" stopColor="#3D2510"/>
                      <stop offset="100%" stopColor="#2A1A0A"/>
                    </linearGradient>
                    <linearGradient id="mv-win" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop offset="0%" stopColor="#7BB5E0"/>
                      <stop offset="60%" stopColor="#4A8FBF"/>
                      <stop offset="100%" stopColor="#E8A060"/>
                    </linearGradient>
                    <radialGradient id="mv-lamp" cx="50%" cy="0%" r="80%">
                      <stop offset="0%" stopColor="#FFD080" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#FF8020" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="mv-blur"><feGaussianBlur stdDeviation="10"/></filter>
                  </defs>
                  {/* Floor */}
                  <path d="M0,320 L500,280 L500,380 L0,380Z" fill="url(#mv-floor)"/>
                  {/* Floor boards */}
                  {[295,310,325,340,355].map((y,i) => <line key={i} x1="0" y1={y} x2="500" y2={y - 8} stroke="#4A2E15" strokeWidth="1" opacity="0.4"/>)}
                  {/* Back wall */}
                  <rect x="0" y="0" width="500" height="325" fill="#1C0F08" opacity="0.8"/>
                  {/* Large window */}
                  <rect x="140" y="30" width="220" height="180" rx="4" fill="#1A3A5A"/>
                  <rect x="144" y="34" width="212" height="172" rx="2" fill="url(#mv-win)"/>
                  {/* Window panes */}
                  <line x1="250" y1="34" x2="250" y2="206" stroke="#2A5A8A" strokeWidth="3"/>
                  <line x1="144" y1="120" x2="356" y2="120" stroke="#2A5A8A" strokeWidth="3"/>
                  {/* Window light glow */}
                  <ellipse cx="250" cy="200" rx="120" ry="80" fill="#FFD060" opacity="0.06" filter="url(#mv-blur)"/>
                  {/* Ceiling */}
                  <rect x="0" y="0" width="500" height="20" fill="#120A04"/>
                  {/* Pendant lamp */}
                  <line x1="250" y1="0" x2="250" y2="45" stroke="#888" strokeWidth="2"/>
                  <ellipse cx="250" cy="50" rx="22" ry="12" fill="#D4A040" stroke="#A07820" strokeWidth="1.5"/>
                  <ellipse cx="250" cy="55" rx="130" ry="50" fill="url(#mv-lamp)" filter="url(#mv-blur)"/>
                  {/* Sofa */}
                  <rect x="30" y="240" width="190" height="75" rx="5" fill="#2A3A2A"/>
                  <rect x="30" y="240" width="190" height="20" rx="4" fill="#324032"/>
                  <rect x="30" y="240" width="30" height="75" rx="4" fill="#2E3A2E"/>
                  <rect x="190" y="240" width="30" height="75" rx="4" fill="#2E3A2E"/>
                  {/* Cushions */}
                  <rect x="64" y="258" width="50" height="35" rx="3" fill="#3A4A3A"/>
                  <rect x="118" y="258" width="50" height="35" rx="3" fill="#3A4A3A"/>
                  {/* Side table */}
                  <rect x="225" y="278" width="50" height="38" rx="3" fill="#4A3020"/>
                  <rect x="228" y="270" width="44" height="12" rx="2" fill="#5A3A28"/>
                  {/* Mug */}
                  <rect x="241" y="257" width="16" height="14" rx="2" fill="#E8D0A0"/>
                  <path d="M257,261 Q265,261 265,267 Q265,273 257,273" fill="none" stroke="#E8D0A0" strokeWidth="1.5"/>
                  {/* Bookshelf right */}
                  <rect x="400" y="60" width="80" height="250" fill="#2A1A0C"/>
                  {[80,110,140,170,200,230,260].map((y,i) => <rect key={i} x="400" y={y} width="80" height="2" fill="#1A0E06"/>)}
                  {/* Books */}
                  {[
                    [405,85,12,22,'#8B4040'],[419,85,10,22,'#4080A0'],[431,85,14,22,'#406040'],
                    [405,115,10,22,'#A06040'],[417,115,12,22,'#5050A0'],[431,115,10,22,'#804040'],
                    [405,145,14,22,'#408070'],[421,145,10,22,'#A08040'],[433,145,11,22,'#6040A0'],
                  ].map(([x,y,w,h,c],i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c} rx="1" opacity="0.8"/>)}
                  {/* Plant */}
                  <rect x="50" y="280" width="22" height="28" rx="3" fill="#4A3020"/>
                  <ellipse cx="61" cy="276" rx="18" ry="12" fill="#1A4020"/>
                  <ellipse cx="52" cy="265" rx="10" ry="14" fill="#205530" transform="rotate(-20 52 265)"/>
                  <ellipse cx="72" cy="263" rx="10" ry="14" fill="#1A4820" transform="rotate(15 72 263)"/>
                </svg>
                <div className={styles.moveStat}>
                  <span className={styles.moveStatNum}>98%</span>
                  <span className={styles.moveStatLabel}>Valuation accuracy reported by our community of 500+ members.</span>
                </div>
              </div>
            </div>
            <div className={styles.moveContent}>
              <h2 className={styles.moveTitle}>Move from value to sold.</h2>
              <div className={styles.moveItems}>
                {[
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, title: 'Reach 100k+ Buyers Monthly', desc: "Our platform is the #1 destination for tiny living enthusiasts and serious cash buyers globally." },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Expert Listing Support', desc: 'Get professional photography advice and title transfer support from our dedicated concierge team.' },
                  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, title: 'Transparent 4.9% Seller Fee', desc: "Keep more of your equity. Just 4.9% total — still well below the 5–6% traditional agents charge, with full transaction support." },
                ].map((item, i) => (
                  <div key={i} className={styles.moveItem}>
                    <div className={styles.moveItemIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.moveItemTitle}>{item.title}</p>
                      <p className={styles.moveItemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/list-your-home" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-xl)' }}>
                List Your Home Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className={styles.trustBar}>
        <div className="container">
          <p className={styles.trustLabel}>Trusted &amp; Certified By</p>
          <div className={styles.trustLogos}>
            {[
              { name: 'NOAH', detail: 'National Organization of Alternative Housing' },
              { name: 'RVIA', detail: 'RV Industry Association' },
              { name: 'Tiny House Mag', detail: 'Tiny House Magazine' },
            ].map((logo, i) => (
              <div key={i} className={styles.trustLogo}>
                <span className={styles.trustLogoName}>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className={styles.bottomCta}>
        <div className="container">
          <h2 className={styles.bottomCtaTitle}>Ready to test the market?</h2>
          <p className={styles.bottomCtaSub}>Get your free valuation in under 2 minutes.</p>
          <button className={styles.bottomCtaBtn} onClick={scrollToWizard}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* ===== BOTTOM FEATURE BAR ===== */}
      <section className={styles.featureBar}>
        <div className="container">
          <div className={styles.featureBarGrid}>
            {[
              { num: '01', title: 'Get Value (Instant)', desc: 'Enter your specs and get a precise market value estimate immediately.' },
              { num: '02', title: 'Match with Buyers', desc: 'Tap into our network of 100k+ active owners looking for homes like yours.' },
              { num: '03', title: 'List & Sell (4.9% Fee)', desc: 'List with professional support and a transparent 4.9% seller fee — well below traditional agent commissions.' },
            ].map((item, i) => (
              <div key={i} className={styles.featureBarItem}>
                <span className={styles.featureBarNum}>{item.num}</span>
                <p className={styles.featureBarTitle}>{item.title}</p>
                <p className={styles.featureBarDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
