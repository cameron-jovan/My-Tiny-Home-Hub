'use client';

import React, { useState, FormEvent } from 'react';
import { Check } from 'lucide-react';
import styles from './Newsletter.module.css';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'home';
}

export default function Newsletter({ variant = 'default' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit to Beehiiv
    const form = e.currentTarget;
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
        <h2 className={styles.title}>The Tiny Edit</h2>
        <p className={styles.subtitle}>
          Fresh listings, expert tips, and financing intel delivered to your inbox every Tuesday.
        </p>
        {submitted ? (
          <div className={styles.success}>
            <Check className={styles.checkIcon} size={24} />
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
