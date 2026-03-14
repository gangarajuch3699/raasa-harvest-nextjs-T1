'use client';
// src/app/contact/page.tsx
import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? '919000000000';
  const [sent, setSent]   = useState(false);
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg]     = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, call a server action / API route here.
    setSent(true);
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you — reach us any way you like.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* Form */}
            <div className={styles.card}>
              <p className={styles.cardTitle}>Send us a Message</p>
              {sent ? (
                <p style={{ color: 'var(--green)', fontWeight: 600 }}>
                  ✓ Thank you! We&apos;ll get back to you soon.
                </p>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ravi Kumar" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={5} required value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="How can we help?" />
                  </div>
                  <button type="submit" className={styles.submitBtn}>Send Message</button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Get in Touch</p>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <div>
                      <p className={styles.infoLabel}>Address</p>
                      <p className={styles.infoValue}>Hyderabad, Telangana, India</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📞</span>
                    <div>
                      <p className={styles.infoLabel}>Phone / WhatsApp</p>
                      <a href={`tel:+${waNumber}`} className={`${styles.infoValue} ${styles.infoLink}`}>
                        +{waNumber}
                      </a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📧</span>
                    <div>
                      <p className={styles.infoLabel}>Email</p>
                      <a href="mailto:hello@raasaharvest.in" className={`${styles.infoValue} ${styles.infoLink}`}>
                        hello@raasaharvest.in
                      </a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>🕐</span>
                    <div>
                      <p className={styles.infoLabel}>Working Hours</p>
                      <p className={styles.infoValue}>Mon–Sat, 8 AM – 8 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.waCard}>
                <h3>Fastest Response via WhatsApp</h3>
                <p>We typically reply within minutes on WhatsApp.</p>
                <a
                  href={`https://wa.me/${waNumber}?text=Hi%20Raasa%20Harvest%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                >
                  💬 Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
