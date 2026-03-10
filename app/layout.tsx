import { Inter, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/layout/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans3.variable}`}>
      <body className="min-h-screen">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
