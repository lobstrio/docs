import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lobstr.io API Documentation',
  description: 'Complete API documentation for Lobstr.io',
  keywords: ['API', 'documentation', 'Lobstr', 'scraping', 'web scraping'],
  authors: [{ name: 'Lobstr.io' }],
  openGraph: {
    title: 'Lobstr.io API Documentation',
    description: 'Complete API documentation for Lobstr.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lobstr.io API Documentation',
    description: 'Complete API documentation for Lobstr.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
