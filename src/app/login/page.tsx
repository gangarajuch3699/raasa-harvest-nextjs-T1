'use client';
// src/app/login/page.tsx
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirectTo') ?? '/profile';

  const [tab, setTab]           = useState<'login' | 'signup'>('login');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  // Login form
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // Signup extra
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        await signup(email, password, firstName, lastName);
      }
      router.push(redirectTo);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.logo}>Raasa <span>Harvest</span></p>

        <div className={styles.tabs}>
          <button className={`${styles.tab}${tab === 'login' ? ` ${styles.active}` : ''}`} onClick={() => setTab('login')}>Login</button>
          <button className={`${styles.tab}${tab === 'signup' ? ` ${styles.active}` : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div className={styles.nameRow}>
              <div className="form-group">
                <label>First Name</label>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ravi" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Kumar" />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait…' : tab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
