
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import styles from './wizard.module.css';

const STEPS = ['Home Type', 'Details', 'Description', 'Photos', 'Review'];

const HOME_TYPES = [
  {
    value: 'Tiny House on Wheels',
    label: 'Tiny House on Wheels',
    desc: 'THOW on a trailer',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
        <circle cx="7" cy="22" r="1.5"/><circle cx="17" cy="22" r="1.5"/>
      </svg>
    ),
  },
  {
    value: 'ADU / Backyard Suite',
    label: 'ADU / Backyard Suite',
    desc: 'Accessory dwelling unit',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    value: 'Park Model',
    label: 'Park Model',
    desc: 'Semi-permanent RV',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="18" height="12" rx="2"/><path d="M19 10h2l2 3v3h-4"/>
        <circle cx="6" cy="18" r="2"/><circle cx="14" cy="18" r="2"/>
      </svg>
    ),
  },
  {
    value: 'Container Home',
    label: 'Container Home',
    desc: 'Shipping container conversion',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="1"/>
        <line x1="8" y1="5" x2="8" y2="19"/><line x1="16" y1="5" x2="16" y2="19"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    value: 'Modular / Prefab',
    label: 'Modular / Prefab',
    desc: 'Factory-built home',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
  },
  {
    value: 'Off-Grid Cabin',
    label: 'Off-Grid Cabin',
    desc: 'Remote or wilderness cabin',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <path d="M9 22V12h6v10"/>
        <path d="M12 2v2M7 5l1.5 1.5M17 5l-1.5 1.5"/>
      </svg>
    ),
  },
];

const FEATURES = [
  'Solar System', 'Off-Grid Capable', 'Composting Toilet', 'Loft Bedroom',
  'Full Bathroom', 'Deck / Outdoor Space', 'Custom Build', 'RV Certified',
  'Rainwater Collection', 'Fiber Internet', 'AC / Heat Pump', 'Pet Friendly',
];

const BUILD_STATUSES = ['Ready to Move In', 'Pre-Order', 'Custom Build', 'In Stock'];

export default function NewListingWizard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [buildStatus, setBuildStatus] = useState('Ready to Move In');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [financingAvailable, setFinancingAvailable] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [sellerName, setSellerName] = useState(user?.displayName || '');
  const [sellerPhone, setSellerPhone] = useState('');
  const fileInputRef = useRef(null);

  const toggleFeature = (f) => setAmenities(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = 6 - photoFiles.length;
    const toAdd = files.slice(0, remaining);
    setPhotoFiles(prev => [...prev, ...toAdd]);
    toAdd.forEach(file => {
      const url = URL.createObjectURL(file);
      setPhotos(prev => [...prev, url]);
    });
    e.target.value = '';
  };

  const removePhoto = (i) => {
    setPhotos(prev => prev.filter((_, idx) => idx !== i));
    setPhotoFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleAiAssist = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, location, sqft, beds, yearBuilt, amenities }),
      });
      const data = await res.json();
      if (data.description) setDescription(data.description);
    } catch { /* silent fail */ }
    finally { setAiLoading(false); }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const uploadedUrls = [];
      for (const file of photoFiles) {
        const storageRef = ref(storage, `listings/${Date.now()}_${file.name}`);
        const snap = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snap.ref);
        uploadedUrls.push(url);
      }

      await addDoc(collection(db, 'listings'), {
        title,
        type,
        location,
        state,
        price: Number(price) || 0,
        sqft: Number(sqft) || 0,
        beds,
        yearBuilt,
        buildStatus,
        description,
        amenities,
        financingAvailable,
        photos: uploadedUrls,
        image: uploadedUrls[0] || '',
        specs: { length: '', width: '', height: '', weight: '', trailer: '', insulation: '', water: '', electrical: '', hvac: '' },
        seller: { name: sellerName, phone: sellerPhone, email: user?.email || '' },
        sellerId: user?.uid || '',
        approvalStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      navigate('/dashboard?submitted=1');
    } catch (err) {
      console.error('Listing submission error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canAdvance = () => {
    if (step === 1) return !!type;
    if (step === 2) return !!(title && price && location);
    if (step === 3) return description.length >= 20;
    if (step === 4) return true;
    if (step === 5) return !!(sellerName);
    return false;
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>

          {/* Progress bar */}
          <div className={styles.progress}>
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = n < step;
              const active = n === step;
              return (
                <div key={n} className={styles.progressItem}>
                  <div className={`${styles.progressDot} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                    {done
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : n
                    }
                  </div>
                  <span className={`${styles.progressLabel} ${active ? styles.activeLabel : ''}`}>{label}</span>
                  {i < STEPS.length - 1 && <div className={`${styles.progressLine} ${done ? styles.doneLine : ''}`} />}
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div className={styles.card}>

            {/* STEP 1 */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>What type of home are you selling?</h2>
                <p className={styles.stepSub}>Select the category that best describes your listing.</p>
                <div className={styles.typeGrid}>
                  {HOME_TYPES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      className={`${styles.typeCard} ${type === t.value ? styles.typeCardSelected : ''}`}
                      onClick={() => setType(t.value)}
                    >
                      <span className={styles.typeIcon}>{t.icon}</span>
                      <span className={styles.typeName}>{t.label}</span>
                      <span className={styles.typeDesc}>{t.desc}</span>
                      {type === t.value && (
                        <span className={styles.typeCheck}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Basic listing details</h2>
                <p className={styles.stepSub}>These appear prominently in your listing card and search results.</p>
                <div className={styles.fieldGrid}>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label>Listing title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Modern Cedar THOW with Loft" required />
                  </div>
                  <div className={styles.field}>
                    <label>Asking price (USD)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="85000" min="1000" required />
                  </div>
                  <div className={styles.field}>
                    <label>Size (sq ft)</label>
                    <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="240" min="50" />
                  </div>
                  <div className={styles.field}>
                    <label>Sleeping areas</label>
                    <input type="text" value={beds} onChange={e => setBeds(e.target.value)} placeholder="e.g. 1 Loft Bedroom" />
                  </div>
                  <div className={styles.field}>
                    <label>Year built</label>
                    <input type="text" value={yearBuilt} onChange={e => setYearBuilt(e.target.value)} placeholder="2023" maxLength={4} />
                  </div>
                  <div className={styles.field}>
                    <label>City</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Portland" required />
                  </div>
                  <div className={styles.field}>
                    <label>State</label>
                    <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="OR" maxLength={2} style={{textTransform:'uppercase'}} />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label>Build status</label>
                    <select value={buildStatus} onChange={e => setBuildStatus(e.target.value)}>
                      {BUILD_STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Describe your home</h2>
                <p className={styles.stepSub}>A strong description helps buyers connect. Aim for 2 to 4 sentences.</p>
                <div className={styles.descWrap}>
                  <div className={styles.descHeader}>
                    <label>Description</label>
                    <button type="button" className={styles.aiBtn} onClick={handleAiAssist} disabled={aiLoading}>
                      {aiLoading
                        ? <><span className={styles.aiSpinner} />Generating...</>
                        : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>Write with AI</>
                      }
                    </button>
                  </div>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the standout qualities of this home. What makes it special? Where is it located? What lifestyle does it enable?"
                    maxLength={1000}
                    rows={6}
                  />
                  <span className={styles.charCount}>{description.length} / 1000</span>
                </div>
                <div className={styles.featuresSection}>
                  <label className={styles.featuresLabel}>Features and amenities</label>
                  <div className={styles.featuresGrid}>
                    {FEATURES.map(f => (
                      <label key={f} className={`${styles.featureChip} ${amenities.includes(f) ? styles.featureChipOn : ''}`}>
                        <input type="checkbox" checked={amenities.includes(f)} onChange={() => toggleFeature(f)} />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
                <label className={styles.toggleRow}>
                  <div className={`${styles.toggle} ${financingAvailable ? styles.toggleOn : ''}`} onClick={() => setFinancingAvailable(p => !p)}>
                    <div className={styles.toggleThumb} />
                  </div>
                  <span>Financing available for buyers</span>
                </label>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Add photos</h2>
                <p className={styles.stepSub}>Listings with photos get 4x more inquiries. Upload up to 6 images. The first photo becomes the cover image.</p>
                <div
                  className={styles.dropZone}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handlePhotoAdd({ target: { files: e.dataTransfer.files }, currentTarget: {} }); }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p>Click or drag photos here</p>
                  <span>{photos.length} / 6 uploaded</span>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoAdd} style={{display:'none'}} />
                </div>
                {photos.length > 0 && (
                  <div className={styles.photoGrid}>
                    {photos.map((src, i) => (
                      <div key={i} className={styles.photoThumb}>
                        <img src={src} alt={`Photo ${i + 1}`} />
                        {i === 0 && <span className={styles.coverBadge}>Cover</span>}
                        <button type="button" className={styles.removePhoto} onClick={() => removePhoto(i)} aria-label="Remove photo">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Review and submit</h2>
                <p className={styles.stepSub}>Double-check your details before submitting for review. We typically approve listings within 24 hours.</p>

                <div className={styles.reviewSection}>
                  <h4>Contact info</h4>
                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label>Your name (visible to buyers)</label>
                      <input type="text" value={sellerName} onChange={e => setSellerName(e.target.value)} placeholder="Full name" required />
                    </div>
                    <div className={styles.field}>
                      <label>Phone number</label>
                      <input type="tel" value={sellerPhone} onChange={e => setSellerPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </div>

                <div className={styles.reviewSection}>
                  <h4>Listing summary</h4>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewItem}><span>Type</span><strong>{type}</strong></div>
                    <div className={styles.reviewItem}><span>Title</span><strong>{title}</strong></div>
                    <div className={styles.reviewItem}><span>Price</span><strong>${Number(price).toLocaleString()}</strong></div>
                    <div className={styles.reviewItem}><span>Size</span><strong>{sqft ? `${sqft} sq ft` : 'Not set'}</strong></div>
                    <div className={styles.reviewItem}><span>Location</span><strong>{[location, state].filter(Boolean).join(', ') || 'Not set'}</strong></div>
                    <div className={styles.reviewItem}><span>Year Built</span><strong>{yearBuilt || 'Not set'}</strong></div>
                    <div className={styles.reviewItem}><span>Status</span><strong>{buildStatus}</strong></div>
                    <div className={styles.reviewItem}><span>Financing</span><strong>{financingAvailable ? 'Available' : 'Not offered'}</strong></div>
                    <div className={styles.reviewItem}><span>Photos</span><strong>{photos.length} uploaded</strong></div>
                    {amenities.length > 0 && (
                      <div className={`${styles.reviewItem} ${styles.reviewItemFull}`}><span>Features</span><strong>{amenities.join(', ')}</strong></div>
                    )}
                  </div>
                </div>

                <div className={styles.submitNote}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  Your listing will be reviewed by our team before going live. You will receive an email confirmation once approved.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className={styles.nav}>
              {step > 1 && (
                <button type="button" className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Back
                </button>
              )}
              <div style={{flex:1}} />
              {step < 5 ? (
                <button type="button" className={styles.nextBtn} onClick={() => setStep(s => s + 1)} disabled={!canAdvance()}>
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ) : (
                <button type="button" className={styles.submitListingBtn} onClick={handleSubmit} disabled={submitting || !canAdvance()}>
                  {submitting ? 'Submitting...' : 'Submit Listing'}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
