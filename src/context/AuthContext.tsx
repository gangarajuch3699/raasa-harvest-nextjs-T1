'use client';
// src/context/AuthContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase-client';

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  createdAt?: string;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(uid: string) {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) setProfile(snap.data() as UserProfile);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) await loadProfile(firebaseUser.uid);
      else setProfile(null);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Create server-side session cookie
    const idToken = await cred.user.getIdToken();
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signup(email: string, password: string, firstName: string, lastName: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const profile: UserProfile = {
      uid: cred.user.uid,
      firstName,
      lastName,
      email,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', cred.user.uid), profile);
    setProfile(profile);
    // Create session cookie
    const idToken = await cred.user.getIdToken();
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
  }

  async function logout() {
    await signOut(auth);
    await fetch('/api/auth/session', { method: 'DELETE' });
    setProfile(null);
  }

  async function refreshProfile() {
    if (user) await loadProfile(user.uid);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
