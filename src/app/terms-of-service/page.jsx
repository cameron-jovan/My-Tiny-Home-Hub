import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service | My Tiny Home Hub',
  description: 'The terms and conditions governing your use of My Tiny Home Hub.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      </div>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p className={styles.breadcrumb}>
              <Link to="/">Home</Link>
              <span>/</span>
              Terms of Service
            </p>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.meta}>Last updated: March 25, 2026</p>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.highlight}>
            <p>Please read these Terms of Service carefully before using mytinyhomehub.com. By accessing or using the Site, you agree to be bound by these terms. If you do not agree, please do not use the Site.</p>
          </div>

          <h2>1. Acceptance of Terms</h2>
          <p>These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and My Tiny Home Hub, LLC (&quot;My Tiny Home Hub,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). They govern your use of our website, services, and content (collectively, the &quot;Site&quot;). By using the Site, you represent that you are at least 18 years old and have the legal authority to enter into this agreement.</p>

          <hr className={styles.divider} />

          <h2>2. Description of Services</h2>
          <p>My Tiny Home Hub is an online marketplace and editorial platform for the discovery, research, and purchase of tiny homes, accessory dwelling units (ADUs), and alternative housing. Our services include:</p>
          <ul>
            <li>A curated listings marketplace for tiny homes and ADUs</li>
            <li>Editorial content, guides, and financing resources</li>
            <li>Concierge services to assist buyers through the purchasing process</li>
            <li>Newsletter and email communications</li>
            <li>Future rental marketplace services (My Tiny Rent) subject to separate terms</li>
          </ul>

          <hr className={styles.divider} />

          <h2>3. Listings and Marketplace</h2>

          <h3>Nature of Listings</h3>
          <p>Listings on My Tiny Home Hub are provided for informational purposes. We curate and verify listings to the best of our ability, but we do not own, manufacture, or sell the homes listed. We act as a marketplace facilitator connecting buyers with sellers and builders.</p>

          <h3>No Guarantee of Accuracy</h3>
          <p>While we strive to ensure listing accuracy, we cannot guarantee that all descriptions, pricing, availability, or specifications are current or error-free. All transactions are ultimately between the buyer and the seller or builder. We strongly recommend independent verification of all material facts before any purchase.</p>

          <h3>Concierge Services</h3>
          <p>Our concierge service provides guidance and support throughout the buying process. Concierge representatives are not licensed real estate agents, attorneys, or financial advisors unless otherwise stated. Their assistance is informational and facilitative in nature. Fees for concierge services, where applicable, will be disclosed in writing before service begins.</p>

          <hr className={styles.divider} />

          <h2>4. User Accounts</h2>
          <p>Certain features of the Site require you to create an account. You are responsible for:</p>
          <ul>
            <li>Providing accurate and complete registration information</li>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activity that occurs under your account</li>
          </ul>
          <p>You must notify us immediately at <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a> if you suspect unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>

          <hr className={styles.divider} />

          <h2>5. Prohibited Uses</h2>
          <p>You agree not to use the Site to:</p>
          <ul>
            <li>Post false, misleading, or fraudulent listing information</li>
            <li>Scrape, harvest, or systematically extract data from the Site without our prior written consent</li>
            <li>Interfere with or disrupt the security, integrity, or performance of the Site</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
            <li>Transmit spam, chain letters, or unsolicited commercial communications</li>
            <li>Violate any applicable local, state, national, or international law or regulation</li>
            <li>Use the Site for any purpose that is unlawful or prohibited by these Terms</li>
          </ul>

          <hr className={styles.divider} />

          <h2>6. Intellectual Property</h2>
          <p>All content on the Site, including text, images, logos, graphics, editorial content, and software, is owned by or licensed to My Tiny Home Hub and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any Site content without our prior written permission.</p>
          <p>You retain ownership of any content you submit to the Site. By submitting content, you grant My Tiny Home Hub a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content in connection with the Site.</p>

          <hr className={styles.divider} />

          <h2>7. Third-Party Links and Content</h2>
          <p>The Site may contain links to third-party websites or services. These links are provided for convenience only. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.</p>

          <hr className={styles.divider} />

          <h2>8. Disclaimer of Warranties</h2>
          <p>THE SITE AND ITS CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, MY TINY HOME HUB DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>

          <hr className={styles.divider} />

          <h2>9. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MY TINY HOME HUB AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
          <p>Our total liability for any claims arising under these Terms shall not exceed the greater of (a) the amount you paid us in the twelve months preceding the claim, or (b) one hundred dollars ($100).</p>

          <hr className={styles.divider} />

          <h2>10. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless My Tiny Home Hub and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or related to your use of the Site, your violation of these Terms, or your infringement of any third-party rights.</p>

          <hr className={styles.divider} />

          <h2>11. Governing Law and Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved through binding arbitration in Fulton County, Georgia, in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction.</p>

          <hr className={styles.divider} />

          <h2>12. Changes to These Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective when posted to the Site with an updated &quot;Last updated&quot; date. Your continued use of the Site after changes are posted constitutes your acceptance of the revised Terms. We will make reasonable efforts to notify users of material changes via email or a prominent notice on the Site.</p>

          <hr className={styles.divider} />

          <h2>13. Contact Us</h2>
          <p>For questions about these Terms, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:hello@mytinyhomehub.com">hello@mytinyhomehub.com</a></li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
