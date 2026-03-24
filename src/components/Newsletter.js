'use client';
import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to Beehiiv
    const form = e.target;
    const formData = new FormData(form);
    fetch('https://subscribe-forms.beehiiv.com/api/submit', {
      method: 'POST',
      body: formData,
    }).catch(() => {});
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className={`${styles.section} ${styles[variant]}`} id="newsletter-signup">
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Get the Tiny Living Dispatch</h2>
        <p className={styles.subtitle}>
          Fresh listings, expert tips, and financing intel delivered to your inbox every Tuesday.
        </p>
        {submitted ? (
          <div className={styles.success}>
            <span className={styles.checkIcon}>✓</span>
            <p>You&apos;re in! Check your email for your free ADU Zoning Checklist.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="hidden" name="form_id" value="1707f6a6-7f94-46e2-a94b-07e6d351d33a" />
            <input type="hidden" name="authenticity_token" value="NlDrXEKzS-QDCToeYFY9QQ2yqDhzp-yKtPPY51MR3TG1uRwrjglQAp1K_H_OrQHfv8J31CRfO3CVQQPKUMNTUw" />
            <div className={styles.inputRow}>
              <input
                type="email"
                name="form[email]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={`input ${styles.emailInput}`}
              />
              <button type="submit" className="btn btn-primary btn-lg">
                Subscribe Free
              </button>
            </div>
            <p className={styles.disclaimer}>
              No spam, ever. Unsubscribe anytime. Free ADU Zoning Checklist included.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
