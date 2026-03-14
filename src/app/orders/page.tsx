'use client';
// src/app/orders/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { useAuth } from '@/context/AuthContext';
import styles from './orders.module.css';

interface Order {
  id: string;
  items: { name: string; quantity: number; priceNum: number }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login?redirectTo=/orders');
  }, [loading, user, router]);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
      setFetching(false);
    }
    if (user) fetchOrders();
  }, [user]);

  if (loading || !user) return <div className="container"><div className="spinner" /></div>;

  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>My Orders</h1>
        {fetching ? (
          <div className="spinner" />
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <p>🛍️</p>
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className={styles.list}>
            {orders.map((o) => (
              <div key={o.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.orderId}>Order #{o.id.slice(-8).toUpperCase()}</p>
                    <p className={styles.orderDate}>{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <span className={`${styles.status} ${styles[o.status] ?? ''}`}>{o.status}</span>
                </div>
                <ul className={styles.items}>
                  {o.items.map((item, i) => (
                    <li key={i} className={styles.item}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.priceNum * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.total}>
                  <span>Total</span>
                  <strong>₹{o.totalPrice}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
