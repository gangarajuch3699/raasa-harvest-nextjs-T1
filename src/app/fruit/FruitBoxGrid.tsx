'use client';
// src/app/fruit/FruitBoxGrid.tsx
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { FruitBox } from '@/data/fruitBoxes';
import styles from './fruit.module.css';

export default function FruitBoxGrid({ boxes }: { boxes: FruitBox[] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  function handleAdd(b: FruitBox) {
    addItem({ id: b.id, name: b.name, priceNum: b.priceNum, priceDisplay: b.priceDisplay, imageUrl: b.imageUrl });
    setAdded(b.id);
    setTimeout(() => setAdded(null), 1200);
  }

  return (
    <div className={styles.grid}>
      {boxes.map((b) => (
        <div key={b.id} className={styles.card}>
          <div className={styles.imgWrap}>
            <span className={styles.tierBadge}>{b.tier}</span>
            <Image src={b.imageUrl} alt={b.name} fill style={{ objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className={styles.body}>
            <p className={styles.name}>{b.name}</p>
            <p className={styles.desc}>{b.description}</p>
            <ul className={styles.items}>
              {b.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.meta}>
              <span>⚖️ ~{b.weightKg} kg</span>
              {b.serves && <span>👥 {b.serves}</span>}
            </div>
            <div className={styles.footer}>
              <div>
                <p className={styles.price}>{b.priceDisplay}</p>
              </div>
              <button
                className={`${styles.addBtn}${added === b.id ? ` ${styles.added}` : ''}`}
                onClick={() => handleAdd(b)}
              >
                {added === b.id ? '✓ Added' : '+ Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
