'use client';
// src/app/checkout/page.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const { user, profile } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [address, setAddress] = useState(profile?.address ?? '');

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!user || items.length === 0) return;
    setPlacing(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId:     user.uid,
        items:      items.map((i) => ({ name: i.name, quantity: i.quantity, priceNum: i.priceNum })),
        totalPrice,
        address,
        status:    'pending',
        createdAt: new Date().toISOString(),
      });
      clear();
      router.push('/orders');
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  if (!user) {
    router.push('/login?redirectTo=/checkout');
    return null;
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={placeOrder}>
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Delivery Details</p>
              <div className={styles.fields}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`} disabled style={{ background: '#f9fafb' }} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input value={profile?.phone ?? ''} disabled style={{ background: '#f9fafb' }} />
                </div>
                <div className="form-group">
                  <label>Delivery Address *</label>
                  <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat, Street, City, PIN" />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.placeBtn} disabled={placing}>
              {placing ? 'Placing Order…' : `Place Order — ₹${totalPrice}`}
            </button>
          </form>

          <aside className={styles.summary}>
            <p className={styles.sectionTitle}>Order Summary</p>
            {items.map((i) => (
              <div key={i.id} className={styles.summaryRow}>
                <span>{i.name} × {i.quantity}</span>
                <span>₹{i.priceNum * i.quantity}</span>
              </div>
            ))}
            <hr style={{ margin: '.75rem 0', borderColor: 'var(--border)' }} />
            <div className={`${styles.summaryRow}`} style={{ fontWeight: 800, fontSize: '1.05rem' }}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
