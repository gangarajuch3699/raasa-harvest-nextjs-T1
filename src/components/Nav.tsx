'use client';
// src/components/Nav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import './Nav.css';

export default function Nav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/',        label: 'Home' },
    { href: '/rice',    label: 'Rice' },
    { href: '/fruit',   label: 'Fruit Boxes' },
    { href: '/veg',     label: 'Veggies' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="nav">
      <div className="container nav__inner">
        <Link href="/" className="nav__logo">
          Raasa <span>Harvest</span>
        </Link>

        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav__link${pathname === href ? ' nav__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <Link href="/cart" className="nav__cart-btn" aria-label="Cart">
            🛒
            {totalItems > 0 && <span className="nav__badge">{totalItems}</span>}
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="btn btn-outline" style={{ padding: '.4rem 1rem', fontSize: '.85rem' }}>
                Profile
              </Link>
              <button
                className="btn btn-primary"
                style={{ padding: '.4rem 1rem', fontSize: '.85rem' }}
                onClick={() => logout()}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary" style={{ padding: '.4rem 1rem', fontSize: '.85rem' }}>
              Login
            </Link>
          )}

          <button
            className="nav__menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}
