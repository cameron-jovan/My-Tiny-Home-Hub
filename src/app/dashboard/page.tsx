import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function DashboardContent() {
  const { user } = useAuth();
  const userName = user?.displayName?.split(' ')[0] || 'Julian';
  const userPhoto = user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAqIZtwpTdMRgcCWrJDVheSJThmacoY8CAYwlpLajwDkFLkgoa-K-IFs2bzv-jRKK2GUZshjbBinBeLRKdwVnZhW3HX7hHG_3dTAmgmDEQDn-E2swT2vlDXQH4yEVQBjuXg6cTttFgOX6h47fOUWAbpalpIkgR0JfBUQo3Eq8lS_M9axQPEGywkHYvLkEoyXyX4hqOmB6f0B1NJbAN0Cv9c3d0jc5rZlEb55z-zigm7SMODWmMUcMdYajTRGvKX4RZTSO_9xmWWxg";

  return (
    <div className="bg-[#F9FBFC] text-on-surface antialiased font-body min-h-screen">
      {/* Navigation - Note: We use our shared Navbar component instead of the bare HTML nav to ensure auth states work */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="h-screen w-64 fixed left-0 top-0 pt-24 bg-white border-r border-slate-100 flex flex-col hidden lg:flex z-40">
          <nav className="flex-1 px-4 space-y-1 mt-4">
            <Link to="/dashboard" className="flex items-center gap-3 bg-slate-50 text-[#1B4073] rounded-xl px-4 py-3 font-bold text-sm">
              <span className="material-symbols-outlined">grid_view</span>
              <span>Dashboard</span>
            </Link>
            <Link to="/dashboard/saved" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 hover:text-[#1B4073] rounded-xl px-4 py-3 font-medium text-sm transition-all">
              <span className="material-symbols-outlined">favorite</span>
              <span>Saved Homes</span>
            </Link>
            <Link to="/dashboard/listings" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 hover:text-[#1B4073] rounded-xl px-4 py-3 font-medium text-sm transition-all">
              <span className="material-symbols-outlined">storefront</span>
              <span>My Listings</span>
            </Link>
            <Link to="/dashboard/payments" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 hover:text-[#1B4073] rounded-xl px-4 py-3 font-medium text-sm transition-all">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <span>Payments</span>
            </Link>
            <div className="h-px bg-slate-100 my-4 mx-4"></div>
            <Link to="/editorial" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 hover:text-[#1B4073] rounded-xl px-4 py-3 font-medium text-sm transition-all">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span>Editorial Hub</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 hover:text-[#1B4073] rounded-xl px-4 py-3 font-medium text-sm transition-all">
              <span className="material-symbols-outlined">settings</span>
              <span>Account Settings</span>
            </Link>
          </nav>
          <div className="p-6">
            <div className="bg-[#F1F5F9] rounded-2xl p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Need Help?</p>
              <p className="text-xs text-slate-600 mb-3">Talk to an architectural expert about your project.</p>
              <button className="w-full bg-[#1B4073] text-white py-2 rounded-lg text-xs font-bold shadow-sm">Chat Now</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 pt-28 px-4 md:px-10 pb-12 flex-1">
          {/* Hero / Intelligence Hub */}
          <header className="mb-10 relative rounded-3xl overflow-hidden bg-[#1B4073] text-white">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                alt="Architecture Background" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt5D75AEleT6dcAWbVWqS2W0uD8FX4TtR4offH9-jU665TzATiGaZHba4YWudst0jgZDmQkfjnafpQ6QyiWZoQBoDlTXNp1vF4T7p2g1TeJcPzSt4tRl4BwUT0tIKRf7wfuMJTdvmfrx5anki06HoLj6iJf1L2c8Bm8TzI4BOx41RgTbxC8iWLJjyGLxmBBp_1SLqfS_mEm_jG3TIMmrZB3QqAWD1AvDnTEecA2LLfWmltT3HIyLf6A32LsF8E9seggWXb7qQFvQ"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
              <div>
                <span className="bg-[#8CC540] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Member Dashboard</span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Welcome back, {userName}</h1>
                <p className="text-slate-300 max-w-lg text-lg opacity-90 leading-relaxed font-light">Your pathway to minimalist living is accelerating. Explore market insights below.</p>
                {/* Progress Checklist */}
                <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-bold">Your Path to Tiny Living</p>
                    <span className="text-xs font-bold text-[#8CC540]">60% Complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-[#8CC540] w-3/5"></div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-[#8CC540] text-sm">check_circle</span>
                      <span>Verify Identity</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-60">
                      <span className="material-symbols-outlined text-sm">radio_button_unchecked</span>
                      <span>Set up Stripe</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-[#8CC540] text-sm">check_circle</span>
                      <span>Define Search Area</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Market Intelligence Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:w-1/3">
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:bg-white/15 transition-all">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Price Trends</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-black">+4.2%</p>
                    <span className="material-symbols-outlined text-[#8CC540] text-lg mb-1">trending_up</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic">Avg. sqft price in PNW</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:bg-white/15 transition-all">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Listing Reach</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-black">1.4k</p>
                    <span className="material-symbols-outlined text-slate-300 text-lg mb-1">visibility</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic">Views this week</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:bg-white/15 transition-all">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Buyer Interest</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-black">28</p>
                    <span className="material-symbols-outlined text-[#8CC540] text-lg mb-1">bolt</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic">Active leads for A-Frames</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:bg-white/15 transition-all">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Saved Homes</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-black">12</p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 italic">In your watchlist</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Left: Buyer & Seller Core */}
            <div className="xl:col-span-8 space-y-16">
              {/* Buyer's Section: Curated Gallery */}
              <section>
                <div className="flex justify-between items-end mb-8 border-l-4 border-[#8CC540] pl-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Buyer's Toolkit</span>
                    <h2 className="text-3xl font-extrabold text-[#1B4073] tracking-tight">Saved Listings Gallery</h2>
                  </div>
                  <Link to="/dashboard/saved" className="text-[#1B4073] font-bold text-sm flex items-center gap-2 group hover:underline">
                    Manage Watchlist 
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Property Card */}
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img alt="Cabin" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtSoXkIAs1u8Cnr5gc_yxvFJtNeocpVKj5__ZE9D7UBRi217ip_clrQ61DfxL3oblY10yuoAx0CZFQ26ZDOiLPTIrASP6yrxh7EDJQt7fFJWBPkjkZO_3E2DP6s8AA20lRBLonHXd99dnFctCgo-tXOluqzJv87LXO8k0zZM_WDSZukgDavogJbfWth24-v-2_f_8ocHfpihJd8r7cBp-OgQfvnZEekLg1--hfvzq08cIiESCUPIAqr3XnOAnUhOIWQMnkOAmyxQ"/>
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-black text-[#1B4073] shadow-lg">FROM $84,000</div>
                      <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#1B4073]">The Nordic Zenith A-Frame</h3>
                        <div className="flex gap-1">
                          <span className="material-symbols-outlined text-[#8CC540] text-sm">star</span>
                          <span className="text-xs font-bold text-slate-500">4.9</span>
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        Bend, Oregon
                      </p>
                    </div>
                  </div>
                  {/* Property Card */}
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img alt="Tiny Home" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI7mwRFIwh3pkjwEVDxNc7qgLy1h-Kgff4CnTdHRanACcvemC7ka4llLJdOSBXqkEshotUUzejQoQu8lSVWmx79O0V0hg04y_P_rUw1ycUOcHCCRuzEk9TGKJXV3Y6wfVWI6awhYlJJwCooqYvF4b5qMUHofVjlE9Ty0orv0d68_rDdYD-20jQ3Ern5WTJFoCPqZMsHpGuwoT2gQxNa9z2nmNwSv-98Fu-vzI8SdmoRlt_cDhCKh8m0uxvEwbV67OPVKTdTjVR9Q"/>
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-black text-[#1B4073] shadow-lg">FROM $112,000</div>
                      <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#1B4073]">Eco-Modular Oasis</h3>
                        <div className="flex gap-1">
                          <span className="material-symbols-outlined text-[#8CC540] text-sm">star</span>
                          <span className="text-xs font-bold text-slate-500">4.7</span>
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        Asheville, North Carolina
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seller's Section: Marketplace Engine */}
              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-l-4 border-[#8CC540] pl-6 gap-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Seller's Portal</span>
                    <h2 className="text-3xl font-extrabold text-[#1B4073] tracking-tight">Inventory & Performance</h2>
                  </div>
                  <Link to="/list-your-home" className="bg-[#8CC540] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:-translate-y-1 transition-all text-center">
                    Launch New Listing
                  </Link>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-[#1B4073]">Active Portfolio</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#8CC540]"></span>
                        Active
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        Draft
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {/* Enhanced Listing Row 1 */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-colors gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100">
                          <img alt="Listing" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7wiikrbe-UJ_fpA5JGBLXfJyPNIHv5SdkBng66HY7Lu8rtHINaVnS0l3jvwi79IzFAtchjGmQkyEhsYM_AGyK5wNd9jA6o7w2Q4xJs3UMfFuP_jBtY5vitJMvX9EZ1PsoRhYtPzlHOGqE-lpKxs-ezJJps2fUS7lWcEkXFk-FvnR1w5HHPzGQsWI4K-tzIA7rb35i9NCipAHtXLPn2av7Lr5V2LXPjUZsLncW5WOtT3L-5TYr0IVzJHWhW9ZvCI805b-QkKjRrw"/>
                        </div>
                        <div>
                          <p className="font-bold text-[#1B4073] text-lg">Skyline Loft Studio</p>
                          <p className="text-xs text-slate-400">ID: TH-99238 • 12d online</p>
                        </div>
                      </div>
                      <div className="flex flex-1 max-w-sm justify-around px-8">
                        <div className="text-center">
                          <p className="text-lg font-black text-[#1B4073]">842</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-black text-[#1B4073]">56</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Saves</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-black text-[#8CC540]">12</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leads</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-lg bg-[#8CC540]/10 text-[#8CC540] text-[10px] font-black uppercase">Active</span>
                        <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-[#1B4073] hover:text-white transition-all">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </div>
                    {/* Enhanced Listing Row 2 */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-colors gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100">
                          <img alt="Listing" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXsqFK_Lmq2ktj5Hso6AnEUi_3j9z4bcC72DZcAUhHV--Jl5fdGHjXMi6yy9j8QeJtJYhnk5lQ1WbFznIF257LbA85zzxR5sxWeld646gyHG7VdqclBTEiqra7pb0Ni3MzVjL-TpIR-Uk6DsaND7xQGUMWBd4VAHHzVIyp60RE_FEz4OVgPz7h7oYAj54CAFYeofe7oFe0ZMOaDrh_siEP_aHe67mS6kPAQMh0srB2T3B0653elD5bDSU1rTiRM1ebrh9jOmtCTQ"/>
                        </div>
                        <div>
                          <p className="font-bold text-[#1B4073] text-lg">The Artisan Hideaway</p>
                          <p className="text-xs text-slate-400">ID: TH-99102 • Last saved 2h ago</p>
                        </div>
                      </div>
                      <div className="flex flex-1 max-w-sm justify-around px-8 opacity-40">
                        <div className="text-center">
                          <p className="text-lg font-black text-[#1B4073]">--</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-black text-[#1B4073]">--</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Saves</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-black text-[#1B4073]">--</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leads</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-black uppercase">Draft</span>
                        <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-[#1B4073] hover:text-white transition-all">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Community Pulse & Editorial */}
              <section>
                <div className="flex justify-between items-end mb-8 border-l-4 border-[#8CC540] pl-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">Community Pulse</span>
                    <h2 className="text-3xl font-extrabold text-[#1B4073] tracking-tight">Active Discussions</h2>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-[#ECFDF5] p-8 rounded-3xl border border-emerald-100 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-emerald-50 bg-slate-200"></div>
                          <div className="w-8 h-8 rounded-full border-2 border-emerald-50 bg-slate-300"></div>
                          <div className="w-8 h-8 rounded-full border-2 border-emerald-50 bg-slate-400"></div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700">124 others are reading</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1B4073] leading-tight mb-4">Mastering Spatial Intelligence in 400sqft</h3>
                      <button className="flex items-center gap-2 text-emerald-700 font-bold text-sm group-hover:gap-4 transition-all">
                        Join Discussion <span className="material-symbols-outlined text-base">forum</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#FEF2F2] p-8 rounded-3xl border border-rose-100 relative overflow-hidden group">
                    <div className="relative z-10">
                      <span className="bg-rose-500 text-[10px] text-white font-black px-2 py-0.5 rounded uppercase tracking-tighter mb-4 inline-block">Hot Topic</span>
                      <h3 className="text-xl font-bold text-[#1B4073] leading-tight mb-4">Off-Grid Solar: The 2024 Readiness Guide</h3>
                      <button className="flex items-center gap-2 text-rose-600 font-bold text-sm group-hover:gap-4 transition-all">
                        View Guide <span className="material-symbols-outlined text-base">auto_stories</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Right: Premium Widgets */}
            <div className="xl:col-span-4 space-y-10">
              {/* Premium Concierge Profile */}
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CC540]/5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Your Personal Concierge</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 ring-4 ring-slate-50">
                    <img 
                      alt="Concierge" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8QTRfPMMjRRxv2iVgFpQ9dauAZgUj_5Zdz5kCKNIwqbUBYq_WM6eWCxa14A-58D629qi8N3_cqW2TtAwiC6hDpjCpFO10LLgjxskDNr7Bf1iO0iYezbX-Mj_RCKr6djypAuHJPsWZFaTunk1gbnoiIkzpPXozxKobCQRG3-CgzWlSd6OE1rjQIKo-qnQEAWgI3GqdiWvOPYDD3iEQtxK86fPWdg1pc13TZ1MfoddSMB-K_pGMyCjlsKMqfvEDR-dsiBgLyy_C0Q"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B4073] text-lg">Elena Rossi</p>
                    <p className="text-xs text-[#8CC540] font-bold uppercase tracking-tight">Architectural Strategist</p>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl">
                    <span className="material-symbols-outlined text-[#1B4073] mt-0.5">chat_bubble</span>
                    <p className="text-xs text-slate-600 leading-relaxed italic">"{userName}, I found two new modular designs in Oregon that fit your $150k target perfectly. Want a quick review?"</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#1B4073] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#1B4073]/20 hover:brightness-110">Chat Now</button>
                  <button className="bg-white border-2 border-[#1B4073] text-[#1B4073] py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#1B4073]/5">Book Strategy</button>
                </div>
              </section>
              {/* Search Intelligence */}
              <section className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200/60">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-[#1B4073]">Active Alerts</h3>
                  <span className="bg-[#8CC540]/10 text-[#8CC540] px-2 py-1 rounded text-[10px] font-black">3 ACTIVE</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group cursor-pointer hover:border-[#8CC540] transition-all">
                    <div className="flex justify-between mb-2">
                      <p className="text-[10px] font-black uppercase text-slate-400">Hunt #1</p>
                      <span className="material-symbols-outlined text-slate-300 text-sm">more_horiz</span>
                    </div>
                    <p className="font-bold text-[#1B4073]">Pacific NW • A-Frame • &lt;$150k</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <span className="material-symbols-outlined text-sm">mail</span> Daily
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <span className="material-symbols-outlined text-sm text-[#8CC540]">bolt</span> Push Active
                      </span>
                    </div>
                  </div>
                  <button className="w-full border-2 border-dashed border-slate-300 py-6 rounded-2xl text-slate-400 font-bold text-sm flex flex-col items-center justify-center gap-2 hover:border-[#1B4073] hover:text-[#1B4073] hover:bg-white transition-all">
                    <span className="material-symbols-outlined text-2xl">add_circle</span>
                    Add New Automated Search
                  </button>
                </div>
              </section>
              {/* Notification Feed */}
              <section>
                <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="text-lg font-black text-[#1B4073]">Real-time Feed</h3>
                  <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#1B4073]">Clear All</button>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-[#8CC540]/10 flex-shrink-0 flex items-center justify-center text-[#8CC540]">
                      <span className="material-symbols-outlined">price_check</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1B4073] leading-snug">Price Optimization Opportunity</p>
                      <p className="text-xs text-slate-500 mt-1">Similar listings in Bend just sold for 15% higher. Review your "Skyline Loft" pricing.</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase">12 mins ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl hover:bg-white transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-600 leading-snug">Stripe Payout Initiated</p>
                      <p className="text-xs text-slate-400 mt-1">The security deposit for Artisan Hideaway ($2,500) is being processed.</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </section>
              {/* CRO Footer Widget */}
              <div className="bg-[#1B4073] p-8 rounded-3xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <h4 className="font-black text-xl mb-3 tracking-tight">Go Professional</h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">Unlock featured listing placement, verified architect badges, and advanced buyer analytics.</p>
                  <button className="w-full bg-[#8CC540] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:brightness-110">Upgrade Account</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
