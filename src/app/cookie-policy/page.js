import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Cookie Policy | My Tiny Home Hub',
  description: 'Learn how My Tiny Home Hub uses cookies and tracking technologies.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span>/</span>
              Cookie Policy
            </p>
            <h1 className={styles.title}>Cookie Policy</h1>
            <p className={styles.meta}>Last updated: March 25, 2026</p>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.highlight}>
            <p>This Cookie Policy explains what cookies are, how My Tiny Home Hub uses them, and how you can manage your preferences. By continuing to use the Site, you consent to the use of cookies as described here.</p>
          </div>

          <h2>1. What Are Cookies?</h2>
          <p>Cookies are small text files that a website stores on your device (computer, phone, or tablet) when you visit. They allow the site to recognize your device on subsequent visits, remember your preferences, and gather analytics data to improve performance.</p>
          <p>In addition to cookies, we may use similar technologies such as web beacons, pixels, and local storage (&quot;localStorage&quot;) to achieve similar purposes.</p>

          <hr className={styles.divider} />

          <h2>2. Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>These cookies are necessary for the Site to function and cannot be turned off. They are typically set in response to actions you take, such as signing in or filling out forms.</p>
          <ul>
            <li><strong>Authentication cookies</strong> (Firebase): Maintain your signed-in session so you do not have to log in on every page.</li>
            <li><strong>Preference cookies</strong>: Remember settings like modal dismissal (e.g., our Coming Soon notice). We store a key <code>mthh_coming_soon_dismissed</code> in localStorage to remember if you have dismissed our site-wide announcement modal.</li>
          </ul>

          <h3>Analytics Cookies</h3>
          <p>These cookies help us understand how visitors interact with the Site. All data is aggregated and does not identify individual users.</p>
          <ul>
            <li><strong>Google Analytics (_ga, _gid, _gat)</strong>: Tracks page views, session duration, user flows, and other usage metrics. Data is sent to Google&apos;s servers and processed in accordance with Google&apos;s Privacy Policy. Cookies persist for up to 2 years (_ga) or 24 hours (_gid).</li>
          </ul>

          <h3>Marketing and Functional Cookies</h3>
          <p>These cookies may be set by third-party services embedded in or linked from the Site. They help deliver relevant content and track the effectiveness of our communications.</p>
          <ul>
            <li><strong>Beehiiv</strong>: Our email platform may set cookies related to newsletter subscription forms and email tracking (open rates, link clicks). These are governed by Beehiiv&apos;s privacy practices.</li>
          </ul>

          <hr className={styles.divider} />

          <h2>3. Third-Party Cookies</h2>
          <p>Some cookies on the Site are placed by third-party services. We do not control these third parties&apos; cookies. The relevant third-party privacy and cookie policies are:</p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> (covers Firebase and Google Analytics)</li>
            <li><a href="https://www.beehiiv.com/privacy" target="_blank" rel="noopener noreferrer">Beehiiv Privacy Policy</a></li>
          </ul>

          <hr className={styles.divider} />

          <h2>4. How Long Do Cookies Last?</h2>
          <p>Cookies may be:</p>
          <ul>
            <li><strong>Session cookies</strong>: Temporary; deleted when you close your browser.</li>
            <li><strong>Persistent cookies</strong>: Remain on your device for a set period or until you delete them. For example, Google Analytics&apos; <code>_ga</code> cookie lasts up to 2 years.</li>
          </ul>

          <hr className={styles.divider} />

          <h2>5. Managing Your Cookie Preferences</h2>
          <p>You have several options for controlling cookies:</p>

          <h3>Browser Settings</h3>
          <p>Most browsers allow you to view, manage, block, or delete cookies through their settings. Note that blocking all cookies may affect the functionality of the Site. Instructions for common browsers:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>

          <h3>Google Analytics Opt-Out</h3>
          <p>You can prevent Google Analytics from collecting your data by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

          <h3>Do Not Track</h3>
          <p>Some browsers offer a &quot;Do Not Track&quot; (DNT) signal. At this time, the Site does not respond to DNT signals, as there is no consistent industry standard for doing so.</p>

          <hr className={styles.divider} />

          <h2>6. Changes to This Cookie Policy</h2>
          <p>We may update this Cookie Policy to reflect changes in our practices or applicable law. Changes take effect when posted with an updated &quot;Last updated&quot; date. We encourage you to check this page periodically.</p>

          <hr className={styles.divider} />

          <h2>7. Contact Us</h2>
          <p>If you have questions about our use of cookies, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a></li>
            <li><strong>More information:</strong> See our <Link href="/privacy-policy">Privacy Policy</Link> for a full picture of how we handle your data.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
