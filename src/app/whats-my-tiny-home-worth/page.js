'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ValuationPage() {
  const [zip, setZip] = useState('');
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  
  // Valuation Data State
  const [formData, setFormData] = useState({
    category: '',
    sqft: 250,
    beds: 1,
    baths: 1,
    yearBuilt: new Date().getFullYear(),
    offGrid: {
      solar: false,
      compost: false,
      catchment: false,
      greywater: false
    },
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const handleCategorySelect = (cat) => {
    setFormData(prev => ({ ...prev, category: cat }));
    setStep(2);
    // Smooth scroll to wizard if needed
    document.getElementById('valuation-wizard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSpecChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleOffGrid = (feature) => {
    setFormData(prev => ({
      ...prev,
      offGrid: { ...prev.offGrid, [feature]: !prev.offGrid[feature] }
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const calculateValuation = async () => {
    setIsCalculating(true);
    setStep(5); // Loading/Calculating state
    
    // Simulate complex calculation
    await new Promise(r => setTimeout(r, 3000));
    
    // "Proprietary Algorithm" Logic
    let basePricePerSqft = 250;
    if (formData.category === 'Foundation') basePricePerSqft = 450;
    if (formData.category === 'Container') basePricePerSqft = 300;
    if (formData.category === 'THOW') basePricePerSqft = 280;
    
    let baseValue = formData.sqft * basePricePerSqft;
    
    // Feature Premiums
    if (formData.offGrid.solar) baseValue += 8500;
    if (formData.offGrid.compost) baseValue += 1500;
    if (formData.offGrid.catchment) baseValue += 3000;
    
    // Condition/Year adjustment (Research shows newer builds hold value better)
    const age = new Date().getFullYear() - formData.yearBuilt;
    const ageAdjustment = 1 - (age * 0.02); // 2% depreciation per year for this mock
    
    let estimatedValue = baseValue * ageAdjustment;
    
    // Zip Code adjustment (Mock)
    const zipSuffix = parseInt(zip.slice(-1)) || 5;
    const marketHeat = 1 + (zipSuffix * 0.01);
    estimatedValue *= marketHeat;
    
    const finalValue = Math.round(estimatedValue);
    
    setResult({
      value: finalValue,
      range: [Math.round(finalValue * 0.92), Math.round(finalValue * 1.08)],
      confidence: 98,
      demand: 'Critically High'
    });
    
    setIsCalculating(false);
    
    // Save to Firestore
    try {
      await addDoc(collection(db, 'valuations'), {
        ...formData,
        zip,
        estimatedValue: finalValue,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error saving valuation:', err);
    }
  };

  return (
    <div className="bg-[#F8FAFB] text-[#051f1e] font-sans selection:bg-[#8CC540] selection:text-black min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Section 1: Hero with Live Market Pulse */}
        <section className="relative min-h-[750px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Aspirational tiny home interior" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHm0eJz7wz8u_vU-0H2l_0B6x2Wq8qZ_vJp3Pz5W-3t8_z4yU_z2g"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002a58]/90 via-[#002a58]/40 to-transparent"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              {/* Live Market Pulse Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8CC540]/90 backdrop-blur-md rounded-full mb-8 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-black">Live Market Pulse: 12,482 active buyers searching this week</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[1.05] mb-6">
                What&apos;s Your Tiny Home Worth?
              </h1>
              <p className="text-xl text-gray-200 font-medium mb-10 max-w-lg leading-relaxed">
                Unlock professional-grade equity data. See exactly what buyers are paying for homes like yours right now.
              </p>
              <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl max-w-xl mb-6">
                <div className="flex-grow relative flex items-center">
                  <span className="absolute left-4 material-symbols-outlined text-gray-400">location_on</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none focus:ring-0 text-[#051f1e] font-bold text-lg placeholder:text-gray-300" 
                    placeholder="Zip Code" 
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => document.getElementById('valuation-wizard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#8CC540] text-black px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  Get Instant Valuation
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              {/* Recently Valued Ticker */}
              <div className="flex items-center gap-3 overflow-hidden h-6 bg-black/20 backdrop-blur-sm rounded-full px-4 inline-flex">
                <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#8CC540]">
                  Recent
                </span>
                <div className="relative flex-grow h-full min-w-[300px] flex items-center">
                  <p className="text-xs font-medium text-white/90">
                    A 2023 Luxury Loft in Denver just valued at <span className="text-[#8CC540] font-bold">$112,000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Bar */}
        <section className="bg-white border-b border-gray-100 py-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#06799B]">distance</span>
                  <h4 className="font-bold text-sm text-[#002a58]">Local Demand</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Real-time buyer competition analytics in your specific region.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#06799B]">architecture</span>
                  <h4 className="font-bold text-sm text-[#002a58]">Material Index</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Live lumber, steel, and utility hardware pricing indexes.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#06799B]">history_edu</span>
                  <h4 className="font-bold text-sm text-[#002a58]">Verified Sales</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">5+ years of closing prices from the MTHH private exchange.</p>
              </div>
            </div>
            <div className="lg:w-5/12 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-16">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 text-center lg:text-left">Trusted & Certified By</p>
              <div className="flex justify-between items-center opacity-40 grayscale gap-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                  <span className="font-extrabold text-lg tracking-tight">NOAH</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">airport_shuttle</span>
                  <span className="font-extrabold text-lg tracking-tight">RVIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">auto_stories</span>
                  <span className="font-extrabold text-lg tracking-tight">Tiny House Mag</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Market Growth */}
        <section className="py-24 bg-[#F8FAFB] px-8 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <span className="text-[#06799B] font-bold text-sm uppercase tracking-widest mb-4 block">Market Report 2024</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002a58] tracking-tight mb-6">The Tiny Home Market is Surging</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Demand has outpaced supply for 18 consecutive months. Sellers are currently capturing an average of <span className="text-[#06799B] font-bold">14% more equity</span> than this time last year.
              </p>
              <div className="flex items-center gap-12">
                <div>
                  <div className="text-3xl font-extrabold text-[#06799B]">+22%</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Year-over-Year Value</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#06799B]">12 Days</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Avg. Time to Sell</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-[#002a58]">Price Appreciation Index</h4>
                <span className="text-[#8CC540] font-bold text-sm">+18.4%</span>
              </div>
              <div className="h-48 w-full flex items-end gap-2">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
                  <path 
                    className="sparkline-path" 
                    d="M0,90 Q20,85 40,70 T80,60 T120,40 T160,20 T200,5" 
                    fill="none" 
                    stroke="#06799B" 
                    strokeWidth="4"
                    style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
                  />
                </svg>
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>Present</span>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Step Tool */}
        <section id="valuation-wizard" className="py-24 bg-white px-8 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F8FAFB] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              {/* Progress Bar */}
              <div className="flex justify-between items-center mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-[#06799B] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg transition-colors ${step >= i ? 'bg-[#06799B] text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {i}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= i ? 'text-[#06799B]' : 'text-gray-400'}`}>
                      {['Home Type', 'Specs', 'Off-Grid', 'Final'][i-1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Category */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#002a58] tracking-tight mb-3">Which category defines your build?</h2>
                    <p className="text-gray-500">Accurate classification ensures a 98% valuation accuracy rate.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'THOW', title: 'THOW', desc: 'Tiny Home on Wheels', icon: 'rv_hookup' },
                      { id: 'Container', title: 'Container', desc: 'Shipping conversions', icon: 'inventory_2' },
                      { id: 'Off-Grid', title: 'Off-Grid Ready', desc: 'Solar, Compost, Catchment', icon: 'solar_power', badge: 'High Demand' },
                      { id: 'Foundation', title: 'Foundation', desc: 'ADUs & Permanent builds', icon: 'cottage' }
                    ].map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`group p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 shadow-sm relative overflow-hidden bg-white ${formData.category === cat.id ? 'border-[#06799B] bg-[#06799B]/5' : 'border-white hover:border-[#06799B]'}`}
                      >
                        {cat.badge && (
                          <div className="absolute top-0 right-0 bg-[#8CC540] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-bl-xl">{cat.badge}</div>
                        )}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${formData.category === cat.id ? 'bg-[#06799B] text-white' : 'bg-[#F8FAFB] text-[#06799B] group-hover:bg-[#06799B] group-hover:text-white'}`}>
                          <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-[#002a58] text-lg">{cat.title}</h3>
                          <p className="text-sm text-gray-500">{cat.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Specs */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#002a58] tracking-tight mb-3">Tell us about the space.</h2>
                    <p className="text-gray-500">Square footage and layout drive core market value.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Total Square Feet</label>
                      <input 
                        type="number" 
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#06799B] outline-none transition-all font-bold text-lg"
                        value={formData.sqft}
                        onChange={(e) => handleSpecChange('sqft', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Year Completed</label>
                      <input 
                        type="number" 
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#06799B] outline-none transition-all font-bold text-lg"
                        value={formData.yearBuilt}
                        onChange={(e) => handleSpecChange('yearBuilt', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Bedrooms</label>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(n => (
                          <button 
                            key={n}
                            onClick={() => handleSpecChange('beds', n)}
                            className={`flex-grow py-3 rounded-xl border-2 transition-all font-bold ${formData.beds === n ? 'bg-[#06799B] border-[#06799B] text-white' : 'border-gray-100 hover:border-[#06799B] text-[#002a58]'}`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Bathrooms</label>
                      <div className="flex gap-2">
                        {[1, 1.5, 2].map(n => (
                          <button 
                            key={n}
                            onClick={() => handleSpecChange('baths', n)}
                            className={`flex-grow py-3 rounded-xl border-2 transition-all font-bold ${formData.baths === n ? 'bg-[#06799B] border-[#06799B] text-white' : 'border-gray-100 hover:border-[#06799B] text-[#002a58]'}`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-[#002a58] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined">arrow_back</span> Back
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      className="px-12 py-4 bg-[#06799B] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#06799B]/90 transition-all shadow-lg hover:translate-x-1"
                    >
                      Continue to Off-Grid <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Off-Grid Features */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#002a58] tracking-tight mb-3">Off-Grid Capabilities?</h2>
                    <p className="text-gray-500">Sustainable features can add significant market premium.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'solar', title: 'Solar Power System', desc: 'Panels, Inverter & Battery Bank', icon: 'solar_power' },
                      { id: 'compost', title: 'Composting Toilet', desc: 'No-flush eco solutions', icon: 'nest_eco_leaf' },
                      { id: 'catchment', title: 'Rainwater Catchment', desc: 'Filtration and storage systems', icon: 'water_drop' },
                      { id: 'greywater', title: 'Greywater System', desc: 'Used water recycling', icon: 'waves' }
                    ].map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => toggleOffGrid(item.id)}
                        className={`group p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 shadow-sm bg-white ${formData.offGrid[item.id] ? 'border-[#8CC540] bg-[#8CC540]/5' : 'border-white hover:border-[#8CC540]'}`}
                      >
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${formData.offGrid[item.id] ? 'bg-[#8CC540] text-black' : 'bg-[#F8FAFB] text-[#8CC540] group-hover:bg-[#8CC540] group-hover:text-black'}`}>
                          <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-[#002a58] text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        {formData.offGrid[item.id] && (
                          <span className="ml-auto material-symbols-outlined text-[#8CC540]">check_circle</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-between">
                    <button onClick={() => setStep(2)} className="text-[#002a58] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined">arrow_back</span> Back
                    </button>
                    <button 
                      onClick={() => setStep(4)}
                      className="px-12 py-4 bg-[#06799B] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#06799B]/90 transition-all shadow-lg hover:translate-x-1"
                    >
                      Final Step <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Final Contact */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#002a58] tracking-tight mb-3">Where should we send your report?</h2>
                    <p className="text-gray-500">Unlock your free, 12-page professional valuation audit.</p>
                  </div>
                  <div className="space-y-6 max-w-md mx-auto">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#06799B] outline-none transition-all font-bold"
                        value={formData.contact.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#06799B] outline-none transition-all font-bold"
                        value={formData.contact.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#002a58]">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#06799B] outline-none transition-all font-bold"
                        value={formData.contact.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                      />
                    </div>
                    
                    <button 
                      onClick={calculateValuation}
                      className="w-full py-5 bg-[#8CC540] text-black rounded-xl font-extrabold text-xl hover:scale-105 transition-all shadow-xl mt-8 flex items-center justify-center gap-2"
                    >
                      Process Valuation
                      <span className="material-symbols-outlined shrink-0">speed</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Calculating */}
              {step === 5 && isCalculating && (
                <div className="py-20 text-center animate-pulse">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-[#06799B]/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#06799B] rounded-full border-t-transparent animate-spin"></div>
                    <span className="material-symbols-outlined text-4xl text-[#06799B] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">analytics</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#002a58] mb-2">Analyzing Market Trends...</h3>
                  <p className="text-gray-500">Cross-referencing {zip} with 50,000+ verified transactions</p>
                </div>
              )}

              {/* Result State */}
              {step === 5 && !isCalculating && result && (
                <div className="animate-in zoom-in duration-500">
                  <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1 bg-[#8CC540]/20 text-black text-xs font-bold uppercase tracking-widest rounded-full mb-4">Valuation Complete</span>
                    <h2 className="text-4xl font-extrabold text-[#002a58] tracking-tighter">Your Estimated Market Value</h2>
                  </div>
                  
                  <div className="bg-[#002a58] rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-2xl mb-12">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <span className="material-symbols-outlined text-[150px]">trending_up</span>
                    </div>
                    <div className="relative z-10">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8CC540] mb-2 block">LIST PRICE RECOMMENDATION</span>
                      <div className="text-6xl md:text-7xl font-extrabold mb-6">${result.value.toLocaleString()}</div>
                      <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[#8CC540] text-sm">verified</span> {result.confidence}% Confidence</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[#8CC540] text-sm">bolt</span> {result.demand} Demand</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                      <h4 className="font-bold text-[#002a58] mb-4 uppercase text-xs tracking-widest">Expected Market Range</h4>
                      <div className="flex items-center justify-between text-sm font-bold text-gray-400 mb-2">
                        <span>${result.range[0].toLocaleString()}</span>
                        <span>${result.range[1].toLocaleString()}</span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded-full relative overflow-hidden">
                        <div className="absolute inset-y-0 left-[10%] right-[10%] bg-[#06799B]/30"></div>
                        <div className="absolute inset-y-0 left-1/2 w-2 bg-[#06799B] -translate-x-1/2 rounded-full"></div>
                      </div>
                    </div>
                    <Link href="/concierge" className="bg-[#06799B] text-white p-6 rounded-2xl flex items-center justify-between group hover:bg-[#002a58] transition-all">
                      <div>
                        <div className="font-extrabold text-lg">Claim Your Full Audit</div>
                        <div className="text-xs text-blue-100">Get the 12-page valuation PDF</div>
                      </div>
                      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button onClick={() => setStep(1)} className="text-gray-400 text-xs font-bold uppercase underline tracking-widest hover:text-[#06799B]">Run Another Valuation</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why List with Us? */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  alt="Modern tiny home kitchen" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHm0eJz7wz8u_vU-0H2l_0B6x2Wq8qZ_vJp3Pz5W-3t8_z4yU_z2g"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#06799B] p-10 rounded-3xl shadow-2xl max-w-xs text-white">
                <div className="text-5xl font-extrabold mb-2">98%</div>
                <p className="text-gray-100 font-medium">Valuation accuracy reported by 50,000+ members.</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#002a58] tracking-tight mb-12 leading-tight">Move from valuation to sold.</h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#06799B]/10 text-[#06799B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#002a58] mb-2">100k+ Monthly Buyers</h4>
                    <p className="text-gray-500 leading-relaxed">The world&apos;s largest dedicated marketplace for tiny lifestyle enthusiasts and verified cash buyers.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#06799B]/10 text-[#06799B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#002a58] mb-2">Concierge Support</h4>
                    <p className="text-gray-500 leading-relaxed">From pro photo guidelines to title transfers, our experts handle the heavy lifting of your sale.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#8CC540]/10 text-[#8CC540] flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">payments</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#002a58] mb-2">Industry-Low 1% Fee</h4>
                    <p className="text-gray-500 leading-relaxed">Maximum equity for you. No hidden commissions. Just a simple, transparent flat-fee structure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restyled Premium Seller's Journey Section */}
        <section className="py-24 px-8 bg-[#002a58]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#8CC540] font-bold text-sm uppercase tracking-widest block mb-4">Your Path to Sold</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">The Seller&apos;s Ecosystem</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:bg-[#06799B]/20 transition-all duration-500">
                <div className="text-7xl font-extrabold text-[#06799B] opacity-20 absolute -top-4 -left-4 group-hover:opacity-40 transition-opacity">1</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#06799B] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <span className="material-symbols-outlined text-white text-3xl">analytics</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mb-4">Get Precise Value</h4>
                  <p className="text-gray-400 leading-relaxed">Run your specs through our proprietary algorithm for an instant, bank-grade market estimate.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:bg-[#06799B]/20 transition-all duration-500">
                <div className="text-7xl font-extrabold text-[#8CC540] opacity-20 absolute -top-4 -left-4 group-hover:opacity-40 transition-opacity">2</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#8CC540] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <span className="material-symbols-outlined text-black text-3xl">radar</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mb-4">Targeted Matching</h4>
                  <p className="text-gray-400 leading-relaxed">We instantly notify the 12k+ active buyers whose search criteria match your home&apos;s unique specs.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-3xl relative overflow-hidden group hover:bg-[#06799B]/20 transition-all duration-500">
                <div className="text-7xl font-extrabold text-white opacity-20 absolute -top-4 -left-4 group-hover:opacity-40 transition-opacity">3</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <span className="material-symbols-outlined text-[#002a58] text-3xl">handshake</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white mb-4">List & Close</h4>
                  <p className="text-gray-400 leading-relaxed">Finalize your listing with our support team and close your sale with an industry-low 1% seller fee.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8 bg-[#06799B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8CC540] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-8 leading-tight">Your Tiny Home has value.<br/>Find it today.</h2>
            <button 
              onClick={() => document.getElementById('valuation-wizard')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#8CC540] text-black px-14 py-6 rounded-2xl font-extrabold text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(140,197,100,0.4)]"
            >
              Start Free Valuation
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
