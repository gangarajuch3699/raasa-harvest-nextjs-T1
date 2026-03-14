// src/app/rice/page.tsx  — Server Component with Client Grid
import type { Metadata } from 'next';
import Image from 'next/image';
import riceHero from '@/assets/rice-hero.png';
import RiceGrid from './RiceGrid';
import { riceProducts } from '@/data/riceProducts';
import styles from './rice.module.css';

export const metadata: Metadata = {
  title: 'Rice',
  description: 'Shop premium rice varieties — Sona Masoori, Basmati, Ponni and more. Directly from Indian farms.',
};

export default async function RicePage() {
  // In production, fetch from Firestore here. Fallback to static data.
  const products = riceProducts;

  return (
    <>
      <section className={styles.hero}>
        <Image src={riceHero} alt="Rice fields" fill priority className={styles.heroImg} />
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Premium Rice</h1>
            <p>Sourced from the finest paddy fields across India</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Our Rice Varieties</h2>
          <p className="section-subtitle">All varieties hand-sorted and packed fresh</p>
          <RiceGrid products={products} />
        </div>
      </section>
    </>
  );
}
