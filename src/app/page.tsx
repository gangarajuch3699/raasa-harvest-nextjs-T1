// src/app/page.tsx  — Server Component
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import heroBg from '@/assets/hero-bg.png';
import riceBg from '@/assets/rice-hero.png';
import fruitBg from '@/assets/fruit-hero.png';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Raasa Harvest — Farm-fresh rice, fruits, and vegetables delivered to your door.',
};

const FEATURES = [
  { icon: '🌾', label: 'Farm Direct', sub: 'Straight from the source' },
  { icon: '🚚', label: 'Free Delivery', sub: 'On orders above ₹500' },
  { icon: '✅', label: 'Quality Assured', sub: 'Hand-inspected produce' },
  { icon: '♻️', label: 'Eco Packaging', sub: 'Sustainable & plastic-free' },
];

const CATEGORIES = [
  { href: '/rice',  title: 'Rice',        sub: 'Sona Masoori, Basmati & more',      img: riceBg  },
  { href: '/fruit', title: 'Fruit Boxes', sub: 'Curated seasonal fruit boxes',       img: fruitBg },
  { href: '/veg',   title: 'Veggies',     sub: 'Coming soon — farm-fresh vegetables', img: heroBg  },
];

export default function HomePage() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? '919000000000';

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Image src={heroBg} alt="" fill priority className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>🌿 100% Natural &amp; Organic</span>
            <h1 className={styles.heroTitle}>
              Farm-Fresh Goodness<br /><span>Delivered to Your Door</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Premium rice varieties, handpicked seasonal fruit boxes, and fresh vegetables —
              sourced directly from trusted Indian farms.
            </p>
            <div className={styles.heroCta}>
              <Link href="/rice" className={styles.heroBtnPrimary}>Shop Rice</Link>
              <Link href="/fruit" className={styles.heroBtnOutline}>Explore Fruit Boxes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Strip ────────────────────────────────── */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {FEATURES.map(({ icon, label, sub }) => (
              <div key={label} className={styles.feature}>
                <span className={styles.featureIcon}>{icon}</span>
                <div>
                  <p className={styles.featureLabel}>{label}</p>
                  <p className={styles.featureSub}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────── */}
      <section className={styles.categories}>
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">Hand-curated farm produce in every category</p>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map(({ href, title, sub, img }) => (
              <div key={href} className={styles.catCard}>
                <Image src={img} alt={title} fill className={styles.catImg} />
                <div className={styles.catOverlay}>
                  <p className={styles.catTitle}>{title}</p>
                  <p className={styles.catSub}>{sub}</p>
                  <Link href={href} className={styles.catLink}>
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────── */}
      <section className={styles.waCta}>
        <div className="container">
          <h2 className={styles.waCtaTitle}>Need Help Choosing?</h2>
          <p className={styles.waCtaSub}>
            Our team is available on WhatsApp to help you pick the right products.
          </p>
          <a
            href={`https://wa.me/${waNumber}?text=Hi%20Raasa%20Harvest%2C%20I%20need%20help%20with%20my%20order`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            💬 Chat with Us
          </a>
        </div>
      </section>
    </>
  );
}
