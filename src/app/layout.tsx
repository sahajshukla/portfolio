import type { Metadata, Viewport } from 'next';
import './globals.css';
import contentConfig from '@/config/contentConfig';

export const metadata: Metadata = {
  title: `${contentConfig.personal.name} - Portfolio`,
  description: contentConfig.hero.subheadline,
  keywords: [
    'Sahaj Shukla',
    'Data Analyst',
    'Audit Analyst',
    'IT Auditor',
    'Technology Audit',
    'Data Engineering',
    'AI',
    'Machine Learning',
    'Python',
    'SQL',
    'Spark',
    'Portfolio',
  ],
  authors: [{ name: contentConfig.personal.name }],
  openGraph: {
    title: `${contentConfig.personal.name} - Portfolio`,
    description: contentConfig.hero.subheadline,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contentConfig.personal.name} - Portfolio`,
    description: contentConfig.hero.subheadline,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
