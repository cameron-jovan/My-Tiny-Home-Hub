'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BarChart3, 
  ChevronRight, 
  Home, 
  MapPin, 
  Maximize, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Users, 
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './page.module.css';

export default function ValuationPage() {
  const [zip, setZip] = useState('');
  const [step, setStep] = useState(0); // 0 = Hero, 1-3 = Wizard
  const [surveyData, setSurveyData] = useState({
    homeType: '',
    condition: '',
    features: [],
    urgency: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const scrollToWizard = () => {
    if (!zip) {
      alert('Please enter a zip code to begin.');
      return;
    }
    setStep(1);
    setTimeout(() => {
      const element = document.getElementById('valuation-wizard');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSurveyChange = (field, value) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature) => {
    setSurveyData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async () => {
    setIsCalculating(true);
    // Simulate complex valuation logic
    await new Promise(r => setTimeout(r, 2500));
    
    const baseValue = 45000;
    const typeMult = surveyData.homeType.includes('Luxury') ? 1.5 : 1;
    const estimatedValue = Math.round(baseValue * typeMult + (surveyData.features.length * 5000));
    
    setResult({
      value: estimatedValue,
      range: [Math.round(estimatedValue * 0.9), Math.round(estimatedValue * 1.1)],
      confidence: 94,
      demandLevel: 'High'
    });
    setIsCalculating(false);
    
    // Save to Firestore
    try {
      await addDoc(collection(db, 'valuations'), {
        zip,
        ...surveyData,
        estimatedValue,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error saving valuation:', err);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className={styles.wizardContent}>
            <h3 className={styles.wizardTitle}>What type of home are we valuing?</h3>
            <div className={styles.homeTypeGrid}>
              {['Tiny House on Wheels', 'Modular / Foundation', 'Luxury ADU Suite'].map(type => (
                <button
                  key={type}
                  onClick={() => { handleSurveyChange('homeType', type); setStep(2); }}
                  className={`${styles.typeCard} ${surveyData.homeType === type ? styles.typeCardActive : ''}`}
                >
                  <Home className={styles.cardIcon} size={24} />
                  <div className={styles.cardLabel}>{type}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.wizardContent}>
            <h3 className={styles.wizardTitle}>Select key premium features</h3>
            <div className={styles.featuresGrid}>
              {['Off-Grid Ready', 'Solar Package', 'High-End Finishes', 'Smart Home Tech', 'Deck/Porch', 'Custom Cabinetry', 'Mini-Split HVAC', 'Full Appliances'].map(f => (
                <button
                  key={f}
                  onClick={() => toggleFeature(f)}
                  className={`${styles.featureBtn} ${surveyData.features.includes(f) ? styles.featureBtnActive : ''}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(3)}
              className={styles.nextBtn}
            >
              Continue to Final Step <ChevronRight size={18} />
            </button>
          </div>
        );
      case 3:
        return (
          <div className={styles.wizardContent}>
            <h3 className={styles.wizardTitle}>Last thing: How soon are you looking to sell?</h3>
            <div className={styles.urgencyGrid}>
              {['Immediately', '1-3 Months', 'Just Curious', 'Ready to List'].map(u => (
                <button
                  key={u}
                  onClick={() => { handleSurveyChange('urgency', u); handleSubmit(); setStep(4); }}
                  className={styles.urgencyBtn}
                >
                  <span>{u}</span>
                  <ArrowRight size={20} />
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return isCalculating ? (
          <div className={styles.calculating}>
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
              <Activity className={styles.loaderIcon} size={32} />
            </div>
            <div className={styles.loaderText}>
              <h3>Analyzing Market Trends...</h3>
              <p>Comparing your specs with 1,200+ verified transactions</p>
            </div>
          </div>
        ) : result ? (
          <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
              <span className={styles.resultBadge}>Valuation Complete</span>
              <h3 className={styles.resultTitle}>Your Estimated Market Value</h3>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueCardBg}><TrendingUp size={200} /></div>
              <div className={styles.valueCardContent}>
                <span className={styles.valueLabel}>LIST PRICE RECOMMENDATION</span>
                <div className={styles.valueAmount}>${result.value.toLocaleString()}</div>
                <div className={styles.valueStats}>
                  <span><CheckCircle2 size={14} /> {result.confidence}% Confidence</span>
                  <span><Activity size={14} /> {result.demandLevel} Demand</span>
                </div>
              </div>
            </div>

            <div className={styles.resultActions}>
              <div className={styles.rangeBox}>
                <div className={styles.rangeLabel}>Market Range</div>
                <div className={styles.rangeVisual}>
                  <span>${result.range[0].toLocaleString()}</span>
                  <div className={styles.rangeTrack}><div className={styles.rangeThumb}></div></div>
                  <span>${result.range[1].toLocaleString()}</span>
                </div>
              </div>
              <Link href="/concierge" className={styles.unlockBtn}>
                <div>
                  <div className={styles.unlockTitle}>Unlock Full Report</div>
                  <div className={styles.unlockSub}>Get a detailed PDF audit</div>
                </div>
                <ChevronRight />
              </Link>
            </div>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,1000 C300,800 400,900 600,700 C800,500 900,600 1000,400 L1000,1000 L0,1000 Z" fill="rgba(139, 92, 246, 0.05)" />
          </svg>
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <Sparkles size={16} /> Data-Driven Market Insights
            </div>
            
            <h1 className={styles.heroTitle}>
              What&apos;s my home worth?
            </h1>
            
            <p className={styles.heroSubtitle}>
              Instantly track your property&apos;s value against 4,000+ real-time tiny home and ADU listings. Proven accuracy for builders and owners.
            </p>

            {/* Main Input Container - Preserving original zip code input as requested */}
            <div className={styles.zipInputWrapper}>
              <div className={styles.zipInputInner}>
                <div className={styles.zipIconField}>
                  <MapPin className={styles.inputIcon} size={24} />
                  <input 
                    type="text" 
                    placeholder="Enter Zip Code" 
                    className={styles.zipField}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <button 
                  onClick={scrollToWizard}
                  className={styles.analyzeBtn}
                >
                  Analyze <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Pulse Indicators */}
            <div className={styles.pulseGrid}>
              <div className={styles.pulseItem}>
                <div className={`${styles.pulseIcon} ${styles.greenBg}`}><TrendingUp size={20} /></div>
                <div className={styles.pulseText}>
                  <div className={styles.pulseVal}>+8.4%</div>
                  <div className={styles.pulseLabel}>YOY Appreciation</div>
                </div>
              </div>
              <div className={styles.pulseItem}>
                <div className={`${styles.pulseIcon} ${styles.blueBg}`}><Users size={20} /></div>
                <div className={styles.pulseText}>
                  <div className={styles.pulseVal}>14k+</div>
                  <div className={styles.pulseLabel}>Active Buyers</div>
                </div>
              </div>
              <div className={styles.pulseItem}>
                <div className={`${styles.pulseIcon} ${styles.orangeBg}`}><Clock size={20} /></div>
                <div className={styles.pulseText}>
                  <div className={styles.pulseVal}>24 Days</div>
                  <div className={styles.pulseLabel}>Avg. Time to Sell</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Surge Section */}
      <section className={styles.marketSurge}>
        <div className="container">
          <div className={styles.surgeGrid}>
            <div className={styles.surgeText}>
              <h2 className={styles.surgeTitle}> Market interest is <br />surging in your local area.</h2>
              <p className={styles.surgeDesc}>
                ADU and Tiny Home inventory is currently at an all-time low while buyer demand has tripled since 2023. Understanding your valuation now ensures you don&apos;t leave equity on the table.
              </p>
              <ul className={styles.surgeList}>
                {[
                  'Real-time comparative market analysis',
                  'Inventory deficit tracking by zip code',
                  'Local zoning and ADU permit impact',
                  'Financing velocity metrics'
                ].map(item => (
                  <li key={item} className={styles.surgeListItem}>
                    <CheckCircle2 size={18} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.surgeVisual}>
              <div className={styles.matrixCard}>
                <div className={styles.matrixHeader}>
                  <div>
                    <h4 className={styles.matrixTitle}>Demand Matrix</h4>
                    <p className={styles.matrixSub}>Last 12 months in {zip || 'National Average'}</p>
                  </div>
                  <Activity className={styles.matrixIcon} size={24} />
                </div>
                <div className={styles.chartArea}>
                  {[40, 60, 45, 75, 55, 90, 85, 100].map((h, i) => (
                    <div key={i} className={styles.chartBar} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className={styles.matrixFooter}>
                  <div className={styles.pulseIndicator}>
                    <div className={styles.pulseDot}></div>
                    <span>Highly Competitive Market</span>
                  </div>
                  <span className={styles.viewComps}>View Comps →</span>
                </div>
              </div>
              <div className={styles.surgeGlow}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section id="valuation-wizard" className={styles.wizardSection}>
        <div className="container">
          <div className={styles.wizardOuter}>
            {step > 0 && (
              <div className={styles.wizardCard}>
                {step < 4 && (
                  <div className={styles.progressBar}>
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`${styles.progressSegment} ${i <= step ? styles.progressActive : ''}`}></div>
                    ))}
                  </div>
                )}
                {renderStep()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className={styles.trustStrip}>
        <div className="container">
          <p className={styles.trustHeading}>Trusted By Industry Leaders</p>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem}><ShieldCheck /> BuildHQ</div>
            <div className={styles.logoItem}><Trophy /> TinyAward</div>
            <div className={styles.logoItem}><BarChart3 /> MarketCore</div>
            <div className={styles.logoItem}><Zap /> PowerTiny</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
