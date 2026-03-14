// src/app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/components/Providers';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title:       { default: 'Raasa Harvest', template: '%s | Raasa Harvest' },
  description: 'Fresh organic rice, seasonal fruits and vegetables delivered to your doorstep.',
  openGraph: {
    siteName: 'Raasa Harvest',
    type:     'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Providers>
          <Nav />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
