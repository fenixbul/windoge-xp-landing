import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Windoge XP (OS)',
  description: 'Windoge XP, On-chain OS powered by Internet Computer (ICP) ∞',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} select-none`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
