// src/app/fruit/page.tsx  — Server Component
import type { Metadata } from 'next';
import Image from 'next/image';
import fruitHero from '@/assets/fruit-hero.png';
import { fruitBoxes } from '@/data/fruitBoxes';
import FruitBoxGrid from './FruitBoxGrid';
import styles from './fruit.module.css';

export const metadata: Metadata = {
  title: 'Fruit Boxes',
  description: 'Handpicked seasonal fruit boxes in Small, Medium and Large sizes. Fresh from Indian farms.',
};

export default function FruitPage() {
  const boxes = fruitBoxes;
  return (
    <>
      <section className={styles.hero}>
        <Image src={fruitHero} alt="Fresh fruit" fill priority className={styles.heroImg} />
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Fruit Boxes</h1>
            <p>Handpicked seasonal selections, delivered fresh</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Choose Your Box</h2>
          <p className="section-subtitle">Every box is packed with the freshest seasonal fruits</p>
          <FruitBoxGrid boxes={boxes} />
        </div>
      </section>
    </>
  );
}
