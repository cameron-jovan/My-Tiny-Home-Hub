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

const YEAR_RANGES = ['Before 2015', '2015–2018', '2019–2021', '2022–2023', '2024+'];

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

const TOTAL_STEPS = 7;

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const progress = (step / TOTAL_STEPS) * 100;

  function toggleFeature(f) {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  async function submit() {
    if (!email) return;
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

      await addDoc(collection(db, 'valuationLeads'), {
        name, email, homeType, sqft, yearRange, condition, state, features,
        valuationLow: data.low,
        valuationMid: data.mid,
        valuationHigh: data.high,
        createdAt: serverTimestamp(),
      });

      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                    max={600}
                    step={10}
                    value={sqft}
                    onChange={e => setSqft(Number(e.target.value))}
                    className={styles.slider}
                  />
                  <div className={styles.sliderLabels}>
                    <span>80 sq ft</span>
                    <span>600 sq ft</span>
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
                <button className={styles.nextBtn} onClick={() => setStep(7)} style={{ marginTop: '32px' }}>
                  {features.length > 0 ? `Continue with ${features.length} feature${features.length > 1 ? 's' : ''}` : 'Skip — no special features'}
                </button>
              </>
            )}

            {/* Step 7: Email Gate */}
            {step === 7 && (
              <>
                <h1 className={styles.question}>Where should we send your valuation?</h1>
                <p className={styles.questionSub}>Your estimate is ready. We&apos;ll also keep you updated on market trends.</p>
                <div className={styles.emailWrap}>
                  <input
                    type="text"
                    className={styles.emailInput}
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    className={styles.emailInput}
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button
                    className={styles.emailSubmit}
                    disabled={!email}
                    onClick={submit}
                  >
                    Get My Valuation
                  </button>
                  {error && <p style={{ color: 'var(--error)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}
                  <p className={styles.emailNote}>No spam. Unsubscribe anytime.</p>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
