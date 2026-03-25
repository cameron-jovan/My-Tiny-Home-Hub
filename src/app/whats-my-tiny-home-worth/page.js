'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const HOME_TYPES = [
  { id: 'thow', name: 'THOW', desc: 'Tiny Home on Wheels', icon: '🚐' },
  { id: 'container', name: 'Container', desc: 'Shipping conversions', icon: '📦' },
  { id: 'off-grid', name: 'Off-Grid Ready', desc: 'Solar, compost, etc', icon: '☀️', featured: true },
  { id: 'foundation', name: 'Foundation', desc: 'ADUs & permanent builds', icon: '🏠' },
];

const STEPS = ['Build Type', 'Specs', 'Condition', 'Finalize'];

export default function ValuationPage() {
  const wizardRef = useRef(null);
  const [step, setStep] = useState(1);
  const [homeType, setHomeType] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const scrollToWizard = () => {
    wizardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => setStep(prev => prev + 1);

  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'valuationLeads'), {
        name, email, homeType, sqft, buildYear, condition, state,
        timestamp: serverTimestamp()
      });
      // Advanced valuation logic simulation
      const baseValue = homeType === 'thow' ? 65000 : homeType === 'container' ? 45000 : 85000;
      const sqftBonus = sqft * 150;
      const yearBonus = parseInt(buildYear) > 2020 ? 10000 : 0;
      const mid = baseValue + sqftBonus + yearBonus;
      setResult({ mid, range: `$${(mid - 5000).toLocaleString()} - $${(mid + 8000).toLocaleString()}` });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [sqft, setSqft] = useState(240);
  const [buildYear, setBuildYear] = useState('2022');
  const [condition, setCondition] = useState('Excellent');
  const [state, setState] = useState('Colorado');

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBreadcrumbs}>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: "What's My Tiny Home Worth?" }]} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>#1 Tiny Home Valuation Platform</span>
          <h1 className={styles.heroH1}>What&apos;s Your Tiny<br />Home Worth?</h1>
          <p className={styles.heroSub}>
            Unlock professional-grade equity data. See exactly what buyers are paying for homes like yours right now.
          </p>
          <button className={styles.heroCta} onClick={scrollToWizard}>
            Get Instant Valuation
          </button>
          <div className={styles.heroProof}>
            <span className={styles.recentBadge}>RECENT</span>
            <span className={styles.recentText}>8,300+ tiny home owners last month</span>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className={styles.trustStrip}>
        <div className={styles.container}>
          <div className={styles.trustInner}>
            <div className={styles.trustItems}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>📍</div>
                <div className={styles.trustLabel}>
                  <h4>Local Demand</h4>
                  <p>Live buyer competition in your area</p>
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>📈</div>
                <div className={styles.trustLabel}>
                  <h4>Material Index</h4>
                  <p>Live lumber & building pricing</p>
                </div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>✅</div>
                <div className={styles.trustLabel}>
                  <h4>Verified Sales</h4>
                  <p>Prices from the last 10 tiny closings</p>
                </div>
              </div>
            </div>
            <div className={styles.partnerLogos}>
              <span className={styles.partnerLabel}>Trusted by industry</span>
              <span style={{fontWeight: 800}}>NOAH</span>
              <span style={{fontWeight: 800}}>RVIA</span>
              <span style={{fontWeight: 800}}>Tiny House Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARKET SECTION ===== */}
      <section className={styles.marketSection}>
        <div className={styles.container}>
          <div className={styles.marketGrid}>
            <div className={styles.marketContent}>
              <span className={styles.marketOverline}>Market Report 2024</span>
              <h2 className={styles.marketH2}>The Tiny Home<br />Market is Surging</h2>
              <p className={styles.marketDesc}>
                Demand has outpaced supply for 18 consecutive months. Sellers are currently capturing an average of <strong style={{color: 'var(--navy)'}}>15% more equity</strong> than this time last year.
              </p>
              <div className={styles.marketStats}>
                <div className={styles.marketStat}>
                  <h3>+22%</h3>
                  <p>Value growth since 2021</p>
                </div>
                <div className={styles.marketStat}>
                  <h3>12 Days</h3>
                  <p>Avg. Time-to-Sold</p>
                </div>
              </div>
            </div>
            <div className={styles.graphCard}>
              <div className={styles.graphHeader}>
                <span className={styles.graphTitle}>Price Appreciation Index</span>
                <span className={styles.graphValue}>+12.4%</span>
              </div>
              <div className={styles.graphCanvas}>
                <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 130C50 120 100 125 150 100C200 75 250 80 300 50C350 20 380 30 400 10" stroke="#00D3D3" strokeWidth="4" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="200" y1="0" x2="200" y2="150" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00D3D3" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#00D3D3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 130C50 120 100 125 150 100C200 75 250 80 300 50C350 20 380 30 400 10V150H0V130Z" fill="url(#paint0_linear)" />
                </svg>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '10px', marginTop: '10px'}}>
                  <span>2021</span><span>2022</span><span>2023</span><span>Q1 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WIZARD SECTION ===== */}
      <section className={styles.wizardSection} ref={wizardRef}>
        <div className={styles.container}>
          <div className={styles.wizardCard}>
            <div className={styles.wizardProgress}>
              {STEPS.map((s, i) => (
                <div key={i} className={`${styles.progressStep} ${step > i ? styles.progressActive : ''}`}>
                  <div className={styles.progressDot}>{i + 1}</div>
                  <span className={styles.progressLabel}>{s}</span>
                </div>
              ))}
            </div>

            <div className={styles.wizardBody}>
              {step === 1 && (
                <>
                  <h2 className={styles.wizardQ}>Which category defines your build?</h2>
                  <p className={styles.wizardSub}>Accurate classification ensures a 98% valuation accuracy rate.</p>
                  <div className={styles.typeGrid}>
                    {HOME_TYPES.map(t => (
                      <div key={t.id} className={`${styles.typeCard} ${homeType === t.id ? styles.typeSelected : ''}`} onClick={() => setHomeType(t.id)}>
                        <div className={styles.typeIcon} style={{fontSize: '2rem'}}>{t.icon}</div>
                        <div>
                          <p className={styles.typeName}>{t.name}</p>
                          <p className={styles.typeDesc}>{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.wizardActions}>
                    <button className={styles.nextBtn} disabled={!homeType} onClick={handleNext}>
                      Continue to Specs <span style={{marginLeft: 8}}>→</span>
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <div style={{textAlign: 'center'}}>
                  <h2 className={styles.wizardQ}>Build specifications</h2>
                  <p className={styles.wizardSub}>The layout and age significantly impact current market desirability.</p>
                  
                  <div style={{maxWidth: 500, margin: '0 auto 40px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                      <span style={{fontWeight: 700}}>Square Footage</span>
                      <span style={{color: 'var(--teal)', fontWeight: 800}}>{sqft} sq ft</span>
                    </div>
                    <input type="range" min="80" max="600" step="10" value={sqft} onChange={e => setSqft(e.target.value)} style={{width: '100%', accentColor: 'var(--teal)'}} />
                  </div>

                  <div style={{maxWidth: 500, margin: '0 auto'}}>
                    <p style={{fontWeight: 700, marginBottom: 16, textAlign: 'left'}}>Build Year</p>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                      {['2024', '2023', '2022', '2021', '2020', 'Before 2020'].map(y => (
                        <button key={y} onClick={() => setBuildYear(y)} style={{padding: '10px 20px', borderRadius: '100px', border: '1px solid #ddd', background: buildYear === y ? 'var(--navy)' : 'white', color: buildYear === y ? 'white' : 'black', fontWeight: 600}}>
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.wizardActions} style={{gap: 20}}>
                    <button onClick={handlePrev} style={{background: 'none', border: 'none', color: '#666', fontWeight: 600}}>Back</button>
                    <button className={styles.nextBtn} onClick={handleNext}>Next Step</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{textAlign: 'center'}}>
                  <h2 className={styles.wizardQ}>Condition & Location</h2>
                  <p className={styles.wizardSub}>These factors account for up to 30% of final sale price fluctuations.</p>
                  
                  <div style={{maxWidth: 500, margin: '0 auto 40px'}}>
                    <p style={{fontWeight: 700, marginBottom: 16, textAlign: 'left'}}>Property Condition</p>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10}}>
                      {['Like New', 'Excellent', 'Good', 'Fair'].map(c => (
                        <button key={c} onClick={() => setCondition(c)} style={{padding: '16px', borderRadius: '12px', border: '1px solid #ddd', background: condition === c ? 'var(--teal)' : 'white', color: condition === c ? 'white' : 'black', fontWeight: 600}}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{maxWidth: 500, margin: '0 auto'}}>
                    <p style={{fontWeight: 700, marginBottom: 12, textAlign: 'left'}}>Where is it located?</p>
                    <select value={state} onChange={e => setState(e.target.value)} style={{width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd'}}>
                      <option>Colorado</option><option>California</option><option>Texas</option><option>Florida</option><option>Oregon</option><option>Washington</option>
                    </select>
                  </div>

                  <div className={styles.wizardActions} style={{gap: 20}}>
                    <button onClick={handlePrev} style={{background: 'none', border: 'none', color: '#666', fontWeight: 600}}>Back</button>
                    <button className={styles.nextBtn} onClick={handleNext}>Continue to Results</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{textAlign: 'center'}}>
                  {!result ? (
                    <>
                      <h2 className={styles.wizardQ}>Where should we send your report?</h2>
                      <p className={styles.wizardSub}>Your valuation is weighted against 5,000+ local comps. Enter email to unlock.</p>
                      <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: '0 auto'}}>
                        <input type="text" placeholder="First Name" value={name} onChange={e => setName(e.target.value)} style={{width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd'}} required />
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%', padding: '14px', marginBottom: '24px', borderRadius: '8px', border: '1px solid #ddd'}} required />
                        <button type="submit" className={styles.nextBtn} style={{width: '100%', justifyContent: 'center'}} disabled={loading}>
                          {loading ? 'Calculating...' : 'Unlock Valuation Result'}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div style={{animation: 'fadeIn 0.5s ease'}}>
                      <h2 className={styles.wizardQ}>Your Market Valuation</h2>
                      <div style={{marginTop: 40, padding: 30, background: 'var(--gray-50)', borderRadius: 24, border: '2px solid var(--teal)'}}>
                        <h3 style={{fontSize: '1rem', color: '#666', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em'}}>Estimated Market Value</h3>
                        <p style={{fontSize: '4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 12}}>${result.mid.toLocaleString()}</p>
                        <div style={{display: 'inline-block', background: 'rgba(0,211,211,0.1)', color: 'var(--teal)', padding: '6px 16px', borderRadius: '100px', fontWeight: 700}}>
                          Range: {result.range}
                        </div>
                      </div>
                      <div style={{marginTop: 32}}>
                        <Link href="/list-your-home" className={styles.nextBtn} style={{margin: '0 auto'}}>
                          List Your Home Free →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUE SECTION ===== */}
      <section className={styles.valueSection}>
        <div className={styles.container}>
          <div className={styles.valueGrid}>
            <div className={styles.valueImgBox}>
              <div className={styles.valueImg}>
                <Image src="/images/tiny-home-interior.jpg" alt="Modern tiny home kitchen" width={600} height={450} style={{borderRadius: 24, objectFit: 'cover'}} />
              </div>
              <div className={styles.valueStatBadge}>
                <span className={styles.valueStatNum}>98%</span>
                <span className={styles.valueStatText}>Valuation accuracy reported by 10,000+ members.</span>
              </div>
            </div>
            <div className={styles.valueContent}>
                  <div className={styles.valueItemIcon}>💎</div>
                  <div>
                    <p className={styles.valueItemTitle}>Industry-Low 1% Fee</p>
                    <p className={styles.valueItemDesc}>Maximum equity for you. No hidden commissions. Just a simple, transparent flat-fee structure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM SECTION ===== */}
      <section className={styles.ecoSection}>
        <div className={styles.container}>
          <span className={styles.ecoOverline}>Your Path To Sold</span>
          <h2 className={styles.ecoTitle}>The Seller's Ecosystem</h2>
          <div className={styles.ecoGrid}>
            <div className={styles.ecoCard}>
              <div className={styles.ecoIcon}>📊</div>
              <h3>Get Precise Value</h3>
              <p>Put your home through our proprietary algorithm for an instant, data-grade market estimate.</p>
            </div>
            <div className={styles.ecoCard}>
              <div className={styles.ecoIcon}>🎯</div>
              <h3>Targeted Matching</h3>
              <p>We instantly notify the 1,000+ active buyers whose search criteria match your home's unique specs.</p>
            </div>
            <div className={styles.ecoCard}>
              <div className={styles.ecoIcon}>⚡</div>
              <h3>List & Close</h3>
              <p>Finalize your listing with our support team and close your sale with our industry-low 1% seller fee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <h2>Your Tiny Home has value.<br />Find it today.</h2>
          <button className={styles.ctaBtn} onClick={scrollToWizard}>Start Free Valuation</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
