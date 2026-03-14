// src/components/Footer.tsx  (Server Component)
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? '919000000000';

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Raasa <span>Harvest</span></p>
          <p className={styles.tagline}>Farm-fresh produce delivered to your door.</p>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        <div className={styles.links}>
          <h4>Shop</h4>
          <Link href="/rice">Rice</Link>
          <Link href="/fruit">Fruit Boxes</Link>
          <Link href="/veg">Veggies</Link>
        </div>

        <div className={styles.links}>
          <h4>Account</h4>
          <Link href="/login">Login / Sign Up</Link>
          <Link href="/profile">My Profile</Link>
          <Link href="/orders">My Orders</Link>
        </div>

        <div className={styles.links}>
          <h4>Help</h4>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Raasa Harvest. All rights reserved.</p>
      </div>
    </footer>
  );
}
