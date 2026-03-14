'use client';
// src/app/cart/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clear } = useCart();
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? '919000000000';

  const waMessage = items.length
    ? encodeURIComponent(
        `Hi Raasa Harvest! I'd like to order:\n` +
        items.map((i) => `• ${i.name} x${i.quantity} — ${i.priceDisplay} each`).join('\n') +
        `\n\nTotal: ₹${totalPrice}`
      )
    : '';

  if (items.length === 0) {
    return (
      <div className="container">
        <div className={styles.empty}>
          <p style={{ fontSize: '4rem' }}>🛒</p>
          <p>Your cart is empty.</p>
          <Link href="/rice" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Your Cart ({totalItems} items)</h1>
        <div className={styles.layout}>
          {/* Items */}
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.imgWrap}>
                  <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className={styles.itemBody}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>{item.priceDisplay} each</p>
                  <div className={styles.qty}>
                    <button className={styles.qtyBtn} onClick={() => decrement(item.id)}>−</button>
                    <span className={styles.qtyNum}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => increment(item.id)}>+</button>
                    <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--green)', whiteSpace: 'nowrap' }}>
                  ₹{item.priceNum * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className={styles.summary}>
            <p className={styles.summaryTitle}>Order Summary</p>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryRow}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.priceNum * item.quantity}</span>
              </div>
            ))}
            <hr className={styles.divider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutBtn} style={{ display: 'block', textAlign: 'center' }}>
              Proceed to Checkout
            </Link>

            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              💬 Order via WhatsApp
            </a>

            <button
              onClick={clear}
              style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '.85rem', marginTop: '.75rem', cursor: 'pointer' }}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
