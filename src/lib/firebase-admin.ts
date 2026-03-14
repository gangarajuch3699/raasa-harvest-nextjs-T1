// // // lib/firebase-admin.ts
// // // ─────────────────────────────────────────────────────────────────────────────
// // // Firebase Admin SDK for SERVER-SIDE use only (Route Handlers, Server Actions,
// // // Server Components, Middleware). Never import this in Client Components.
// // //
// // // Uses a singleton pattern to prevent "App already exists" errors during
// // // Next.js Hot Module Replacement (HMR) in development.
// // // ─────────────────────────────────────────────────────────────────────────────

// // import 'server-only'; // Ensures this module cannot be imported client-side

// // import {
// //   initializeApp,
// //   getApps,
// //   getApp,
// //   cert,
// //   App,
// //   ServiceAccount,
// // } from 'firebase-admin/app';
// // import { getAuth, Auth } from 'firebase-admin/auth';
// // import { getFirestore, Firestore } from 'firebase-admin/firestore';

// // // ── Parse the service account JSON from the environment variable ──────────
// // function getServiceAccount(): ServiceAccount {
// //   const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// //   if (!raw) {
// //     throw new Error(
// //       'Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable. ' +
// //       'Add it to .env.local (server-side only, no NEXT_PUBLIC_ prefix).'
// //     );
// //   }

// //   try {
// //     return JSON.parse(raw) as ServiceAccount;
// //   } catch {
// //     throw new Error(
// //       'FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON. ' +
// //       'Ensure the entire service account JSON is on a single line with escaped quotes.'
// //     );
// //   }
// // }

// // // ── Singleton initialisation ──────────────────────────────────────────────
// // function getAdminApp(): App {
// //   // During HMR, getApps() will still return the existing app — reuse it.
// //   if (getApps().length > 0) {
// //     return getApp();
// //   }

// //   return initializeApp({
// //     credential: cert(getServiceAccount()),
// //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// //   });
// // }

// // const adminApp: App           = getAdminApp();
// // export const adminAuth: Auth       = getAuth(adminApp);
// // export const adminDb: Firestore    = getFirestore(adminApp);
// // export default adminApp;

// // lib/firebase-admin.ts
// // ─────────────────────────────────────────────────────────────────────────────
// // Firebase Admin SDK for SERVER-SIDE use only (Route Handlers, Server Actions,
// // Server Components, Middleware). Never import this in Client Components.
// //
// // Uses a singleton pattern to prevent "App already exists" errors during
// // Next.js Hot Module Replacement (HMR) in development.
// // ─────────────────────────────────────────────────────────────────────────────

// import 'server-only'; // Ensures this module cannot be imported client-side

// import {
//   initializeApp,
//   getApps,
//   getApp,
//   cert,
//   App,
//   ServiceAccount,
// } from 'firebase-admin/app';
// import { getAuth, Auth } from 'firebase-admin/auth';
// import { getFirestore, Firestore } from 'firebase-admin/firestore';

// // ── Parse the service account JSON from the environment variable ──────────
// function getServiceAccount(): ServiceAccount {
//   const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

//   if (!raw) {
//     throw new Error(
//       'Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable. ' +
//       'Add it to .env.local (server-side only, no NEXT_PUBLIC_ prefix).'
//     );
//   }

//   try {
//     const account = JSON.parse(raw) as ServiceAccount;

//     // CRITICAL: Next.js/Vercel env vars often escape newlines. 
//     // We must manually restore them for the Private Key to be valid.
//     if (account.privateKey) {
//       account.privateKey = account.privateKey.replace(/\\n/g, '\n');
//     }

//     return account;
//   } catch (error) {
//     throw new Error(
//       'FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON. ' +
//       'Ensure the entire service account JSON is on a single line with escaped quotes. ' +
//       `Error details: ${error instanceof Error ? error.message : 'Unknown error'}`
//     );
//   }
// }

// // ── Singleton initialisation ──────────────────────────────────────────────
// function getAdminApp(): App {
//   // During HMR, getApps() will still return the existing app — reuse it.
//   const existingApps = getApps();
  
//   if (existingApps.length > 0) {
//     return getApp();
//   }

//   return initializeApp({
//     credential: cert(getServiceAccount()),
//     // Using the public project ID is fine as a fallback
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   });
// }

// // Initialize the app and export the specific services
// const adminApp: App = getAdminApp();

// export const adminAuth: Auth = getAuth(adminApp);
// export const adminDb: Firestore = getFirestore(adminApp);

// export default adminApp;


import 'server-only';
import {
  initializeApp,
  getApps,
  getApp,
  cert,
  App,
  ServiceAccount,
} from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

/**
 * Decodes the Base64 Service Account key and parses it.
 */
function getServiceAccount(): ServiceAccount {
  const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!base64Key) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env.local');
  }

  try {
    // 1. Decode Base64 string to a standard UTF-8 JSON string
    const decodedJson = Buffer.from(base64Key, 'base64').toString('utf-8');
    
    // 2. Parse the JSON
    const account = JSON.parse(decodedJson) as ServiceAccount;

    // 3. Handle the newline escaping for the Private Key
    if (account.privateKey) {
      account.privateKey = account.privateKey.replace(/\\n/g, '\n');
    }

    return account;
  } catch (error) {
    throw new Error(
      `Firebase Admin Error: Failed to parse Base64 key. ` +
      `Details: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Singleton pattern for Firebase Admin
 */
function getAdminApp(): App {
  const existingApps = getApps();
  
  if (existingApps.length > 0) {
    return getApp();
  }

  return initializeApp({
    credential: cert(getServiceAccount()),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Initialize and export services
const adminApp: App = getAdminApp();

export const adminAuth: Auth = getAuth(adminApp);
export const adminDb: Firestore = getFirestore(adminApp);

export default adminApp;