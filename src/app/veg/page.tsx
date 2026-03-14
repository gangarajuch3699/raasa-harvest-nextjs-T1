// src/app/veg/page.tsx
import type { Metadata } from 'next';
import styles from './veg.module.css';

export const metadata: Metadata = { title: 'Veggies — Coming Soon' };

export default function VegPage() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.emoji}>🥦</span>
      <h1 className={styles.title}>Veggies — Coming Soon!</h1>
      <p className={styles.sub}>
        We&apos;re busy sourcing the freshest vegetables from local farms.<br />
        Check back soon or join our WhatsApp channel for updates.
      </p>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '919000000000'}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.waBtn}
      >
        💬 Get Notified on WhatsApp
      </a>
    </div>
  );
}
