import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy | My Tiny Home Hub',
  description: 'Learn how My Tiny Home Hub collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span>/</span>
              Privacy Policy
            </p>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: March 25, 2026</p>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.highlight}>
            <p>This Privacy Policy explains how My Tiny Home Hub, LLC (&quot;My Tiny Home Hub,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you use our website at mytinyhomehub.com (the &quot;Site&quot;). By using the Site, you agree to the practices described here.</p>
          </div>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>We collect information you voluntarily provide, including:</p>
          <ul>
            <li><strong>Account registration:</strong> Name, email address, and profile information when you create an account via Google Sign-In.</li>
            <li><strong>Newsletter and waitlist sign-ups:</strong> Email address and, where applicable, your role (e.g., property owner or renter) when you subscribe to our newsletter or join a product waitlist.</li>
            <li><strong>Concierge inquiries:</strong> Contact details, preferences, and any information you submit through our inquiry forms.</li>
            <li><strong>Communications:</strong> Any messages you send to us directly via email or contact forms.</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>When you visit the Site, we automatically collect certain technical data, including:</p>
          <ul>
            <li>IP address and general location (country/region)</li>
            <li>Browser type and operating system</li>
            <li>Pages viewed, time spent on pages, and referring URLs</li>
            <li>Device identifiers and browser cookies</li>
          </ul>

          <hr className={styles.divider} />

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and improve the Site and its features</li>
            <li>Respond to inquiries and deliver our concierge services</li>
            <li>Send newsletters, product updates, and marketing communications you have opted into</li>
            <li>Notify you about new listings, guides, and editorial content relevant to your interests</li>
            <li>Analyze usage patterns to improve user experience and site performance</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>

          <hr className={styles.divider} />

          <h2>3. Third-Party Services</h2>
          <p>We work with the following third-party services that may process your data:</p>

          <h3>Google Firebase</h3>
          <p>We use Google Firebase for user authentication, data storage, and hosting. Firebase may collect and process data in accordance with Google&apos;s Privacy Policy. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a> for details.</p>

          <h3>Google Analytics</h3>
          <p>We use Google Analytics to understand how visitors use the Site. Google Analytics collects data such as pages viewed, session duration, and general location. This data is aggregated and anonymized. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h3>Beehiiv</h3>
          <p>We use Beehiiv to manage our newsletter and email communications. When you subscribe, your email address is transmitted to Beehiiv&apos;s platform. See <a href="https://www.beehiiv.com/privacy" target="_blank" rel="noopener noreferrer">Beehiiv&apos;s Privacy Policy</a> for details.</p>

          <hr className={styles.divider} />

          <h2>4. Cookies</h2>
          <p>We use cookies and similar tracking technologies to enhance your experience on the Site. For a full explanation of the cookies we use and how to manage them, please see our <Link href="/cookie-policy">Cookie Policy</Link>.</p>

          <hr className={styles.divider} />

          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. If you request deletion of your account or data, we will remove your personal information within 30 days, except where retention is required by law.</p>

          <hr className={styles.divider} />

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time by clicking &quot;Unsubscribe&quot; in any email or contacting us directly.</li>
            <li><strong>Data portability:</strong> Request a portable copy of your data in a commonly used format.</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a>.</p>

          <hr className={styles.divider} />

          <h2>7. Children&apos;s Privacy</h2>
          <p>The Site is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will delete it.</p>

          <hr className={styles.divider} />

          <h2>8. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encrypted data transmission (HTTPS), secure storage via Google Firebase, and access controls. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security but we take your privacy seriously and commit to promptly addressing any known vulnerabilities.</p>

          <hr className={styles.divider} />

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. Continued use of the Site after changes are posted constitutes your acceptance of the updated policy.</p>

          <hr className={styles.divider} />

          <h2>10. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a></li>
            <li><strong>Address:</strong> My Tiny Home Hub, LLC, United States</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
