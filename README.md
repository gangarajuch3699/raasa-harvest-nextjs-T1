# Raasa Harvest — Next.js (src/ layout)

## Project Structure

```
raasa-harvest-nextjs/
├── .env.local                        ← Your real env vars (DO NOT commit)
├── .env.local.example                ← Template
├── middleware.ts                     ← Edge route protection
├── next.config.js
├── firestore.rules
│
└── src/
    ├── assets/                       ← Image assets (hero-bg, rice-hero, fruit-hero)
    ├── styles/
    │   └── globals.css               ← Global CSS variables & utility classes
    │
    ├── lib/
    │   ├── firebase-client.ts        ← Client-side Firebase singleton
    │   ├── firebase-admin.ts         ← Admin SDK (server-only)
    │   └── session.ts                ← HTTP-only cookie helpers
    │
    ├── data/
    │   ├── riceProducts.ts           ← Static rice product data
    │   └── fruitBoxes.ts             ← Static fruit box data
    │
    ├── context/
    │   ├── CartContext.tsx           ← useReducer cart state
    │   └── AuthContext.tsx           ← Firebase Auth + Firestore profile
    │
    ├── components/
    │   ├── Providers.tsx             ← Wraps CartContext + AuthContext
    │   ├── Nav.tsx + Nav.css         ← Sticky nav (Client — needs cart count)
    │   ├── Footer.tsx + Footer.module.css
    │
    └── app/                          ← Next.js App Router
        ├── layout.tsx                ← Root layout + globals
        ├── page.tsx + page.module.css              ← Home
        ├── rice/
        │   ├── page.tsx              ← Rice page (Server Component)
        │   ├── RiceGrid.tsx          ← Rice grid (Client — cart actions)
        │   └── rice.module.css
        ├── fruit/
        │   ├── page.tsx
        │   ├── FruitBoxGrid.tsx
        │   └── fruit.module.css
        ├── veg/
        │   ├── page.tsx              ← Coming Soon
        │   └── veg.module.css
        ├── cart/
        │   ├── page.tsx
        │   └── cart.module.css
        ├── checkout/
        │   ├── page.tsx
        │   └── checkout.module.css
        ├── login/
        │   ├── page.tsx
        │   └── login.module.css
        ├── profile/
        │   ├── page.tsx
        │   └── profile.module.css
        ├── orders/
        │   ├── page.tsx
        │   └── orders.module.css
        ├── contact/
        │   ├── page.tsx
        │   └── contact.module.css
        └── api/auth/session/
            └── route.ts              ← Session cookie API
```

## Quick Start

```bash
npm install
npm run dev
```

Make sure `.env.local` is filled in (copy from `.env.local.example`).

## Deploy to Vercel

```bash
npm i -g vercel
vercel
# Add all env vars from .env.local in the Vercel dashboard
```
