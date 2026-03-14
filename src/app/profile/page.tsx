'use client';
// src/app/profile/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { useAuth } from '@/context/AuthContext';
import type { UserProfile } from '@/context/AuthContext';
import styles from './profile.module.css';

export default function ProfilePage() {
  const { user, profile, loading, logout, refreshProfile } = useAuth();
  const router = useRouter();

  const [form, setForm]     = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login?redirectTo=/profile');
  }, [loading, user, router]);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await updateDoc(doc(db, 'users', user.uid), { ...form });
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  if (loading || !user) {
    return <div className="container"><div className="spinner" /></div>;
  }

  const initials = `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`.toUpperCase() || '?';

  return (
    <div className="container">
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.headerText}>
            <h1>{profile?.firstName} {profile?.lastName}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Personal Info */}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Personal Information</p>
            <form className={styles.form} onSubmit={handleSave}>
              <div className={styles.row}>
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" value={form.firstName ?? ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" value={form.lastName ?? ''} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" type="tel" value={form.phone ?? ''} onChange={handleChange} placeholder="+91 XXXXXXXXXX" />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input name="whatsapp" type="tel" value={form.whatsapp ?? ''} onChange={handleChange} placeholder="+91 XXXXXXXXXX" />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <input name="address" value={form.address ?? ''} onChange={handleChange} placeholder="Flat, Street, City, PIN" />
              </div>
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              {saved && <span className={styles.success}>✓ Profile updated!</span>}
            </form>
          </div>

          {/* Account */}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Account</p>
            <div className="form-group">
              <label>Email Address</label>
              <input value={user.email ?? ''} disabled style={{ background: '#f9fafb', cursor: 'not-allowed' }} />
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
