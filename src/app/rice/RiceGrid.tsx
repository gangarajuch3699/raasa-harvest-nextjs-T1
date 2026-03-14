'use client';
// src/app/rice/RiceGrid.tsx  — Client Component (needs cart actions)
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { RiceProduct } from '@/data/riceProducts';
import styles from './rice.module.css';

export default function RiceGrid({ products }: { products: RiceProduct[] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  function handleAdd(p: RiceProduct) {
    addItem({
      id:           p.id,
      name:         p.name,
      priceNum:     p.priceNum,
      priceDisplay: p.priceDisplay,
      imageUrl:     p.imageUrl,
    });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1200);
  }

  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <div key={p.id} className={styles.card}>
          <div className={styles.imgWrap}>
            {p.badge && <span className={styles.badge}>{p.badge}</span>}
            <Image
              src={p.imageUrl}
              alt={p.name}
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
          <div className={styles.body}>
            <p className={styles.name}>{p.name}</p>
            <p className={styles.subtitle}>{p.subtitle}</p>
            <p className={styles.desc}>{p.description}</p>
            <div className={styles.meta}>
              <span>⚖️ {p.weightKg} kg</span>
              {p.origin && <span>📍 {p.origin}</span>}
            </div>
            <div className={styles.footer}>
              <span className={styles.price}>{p.priceDisplay}</span>
              <button
                className={`${styles.addBtn}${added === p.id ? ` ${styles.added}` : ''}`}
                onClick={() => handleAdd(p)}
              >
                {added === p.id ? '✓ Added' : '+ Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
