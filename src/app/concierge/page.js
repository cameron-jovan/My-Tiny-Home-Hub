import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CalInlineEmbed from '@/components/CalInlineEmbed';
import CalBookingButton from '@/components/CalBookingButton';
import styles from './page.module.css';

export const metadata = {
  title: 'Concierge Service — Expert Tiny Home Buying Guidance | My Tiny Home Hub',
  description: 'Book a $297 concierge consultation with a tiny home expert. We guide you through listings, financing, zoning, delivery, and setup — every step covered.',
  openGraph: {
    title: 'Concierge Service | My Tiny Home Hub',
    description: 'Expert guidance for your tiny home purchase. One call covers listings, financing, zoning, and delivery.',
    url: 'https://mytinyhomehub.com/concierge',
  },
};

// Replace with your Cal.com username once configured
// e.g. "mthh-cameron/tiny-home-consultation"
const CAL_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK || '';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'My Tiny Home Hub Concierge Service',
  description: 'A $297 expert consultation guiding buyers through every step of purchasing a tiny home — listings, financing, zoning, and delivery.',
  provider: {
    '@type': 'Organization',
    name: 'My Tiny Home Hub',
    url: 'https://mytinyhomehub.com',
  },
  offers: {
    '@type': 'Offer',
    price: '297',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  url: 'https://mytinyhomehub.com/concierge',
  areaServed: 'US',
  serviceType: 'Real Estate Consultation',
};

export default function ConciergePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Concierge Service' }]} />
      </div>
      <div className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <Image
            src="/images/hero-concierge.jpg"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            quality={85}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,43,80,0.82) 0%, rgba(27,64,115,0.65) 60%, rgba(6,121,155,0.55) 100%)' }} aria-hidden="true" />
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Expert Guidance</span>
            <h1 className={styles.heroTitle}>
              Your personal<br />
              <span>tiny home expert.</span>
            </h1>
            <p className={styles.heroSub}>
              Buying a tiny home is complex. Zoning, financing, delivery, setup — most buyers go in blind. Our concierge handles every step so you don&apos;t have to guess.
            </p>
            <div className={styles.price}>
              <span className={styles.priceAmount}>$297</span>
              <span className={styles.priceSub}>one-time consultation · no hidden fees</span>
            </div>
            <CalBookingButton calLink={CAL_LINK} className={styles.heroCta}>
              Book my consultation
            </CalBookingButton>
          </div>
        </section>

        {/* Trust strip */}
        <div className={styles.trust}>
          <div className={styles.trustInner}>
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, text: 'Dedicated expert assigned to you' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text: 'Schedule at your convenience' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: 'Satisfaction guaranteed or full refund' },
            ].map((item, i) => (
              <div key={i} className={styles.trustItem}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <section className={styles.included}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What your consultation covers</h2>
            <div className={styles.grid}>
              {[
                {
                  title: 'Finding the right home',
                  desc: 'We review your goals, budget, and lifestyle to surface listings that actually match — from tiny homes and ADUs to park models and prefabs.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                },
                {
                  title: 'Financing and pre-approval',
                  desc: 'Tiny home financing is different. We walk you through chattel loans, personal loans, RV financing, and land-home packages with lenders who actually close.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
                },
                {
                  title: 'Zoning, permits, and placement',
                  desc: "We review your target location's zoning rules, permit requirements, and utility hookup considerations before you commit to anything.",
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 010 16c-4 0-7-3-7-7"/><path d="M21 21l-4.35-4.35"/></svg>,
                },
                {
                  title: 'Delivery and setup logistics',
                  desc: 'We coordinate delivery windows, site prep requirements, utility connections, and final inspection checklists so you move in without surprises.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                },
                {
                  title: 'Offer and contract guidance',
                  desc: 'We review purchase agreements, flag red flags, and advise on contingencies — protecting your deposit and your interests.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                },
                {
                  title: 'Post-purchase follow-up',
                  desc: "We don't disappear after the call. Your consultant remains available via email for 30 days to answer questions as they come up.",
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
                },
              ].map((item, i) => (
                <div key={i} className={styles.card}>
                  <div className={styles.cardIcon}>{item.icon}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className={styles.booking}>
          <div className={styles.bookingInner}>
            <h2 className={styles.sectionTitle}>Pick a time. We&apos;ll handle the rest.</h2>

            {CAL_LINK ? (
              <div className={styles.calEmbed}>
                <CalInlineEmbed calLink={CAL_LINK} />
              </div>
            ) : (
              <div className={styles.setupPlaceholder}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3>Booking calendar coming soon</h3>
                <p>
                  Add your Cal.com link to <code>NEXT_PUBLIC_CALCOM_LINK</code> in <code>.env.local</code> to activate scheduling.
                  <br /><br />
                  Format: <code>your-username/tiny-home-consultation</code>
                </p>
                <a href="mailto:hello@mytinyhomehub.com" className="btn btn-primary">
                  Book via email in the meantime
                </a>
              </div>
            )}

            <p className={styles.bookingNote}>
              Questions before booking? <a href="mailto:hello@mytinyhomehub.com">Email us</a> — we respond within one business day.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
