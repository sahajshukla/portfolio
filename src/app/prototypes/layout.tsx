import { Instrument_Serif, Inter, JetBrains_Mono, Space_Grotesk, Fraunces, DM_Sans, Newsreader, Bricolage_Grotesque, Spectral } from 'next/font/google';
import './prototypes.css';

const serif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Architectural grotesque — kept for comparison with the warmer Atelier
const display = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Soft variable serif used by Substack, Pitch — gentle and contemporary, not editorial-traditional
const fraunces = Fraunces({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Warmer, more humanist than Inter — softer rounded forms for body
const dmsans = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
});

// Newsreader — kept for earlier prototypes
const newsreader = Newsreader({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-news',
  display: 'swap',
});

// Bricolage Grotesque — variable-width geometric-humanist sans. NYT R&D feel.
// Used by Sonata Atelier for all display headlines. Width axis replaces italic for emphasis.
const bricolage = Bricolage_Grotesque({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

// Spectral — sturdy reading serif designed by Production Type.
// Body voice in the Sonata Atelier. Beautiful italic, never precious.
const spectral = Spectral({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-spectral',
  display: 'swap',
});

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function PrototypesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} ${sans.variable} ${display.variable} ${fraunces.variable} ${dmsans.variable} ${newsreader.variable} ${bricolage.variable} ${spectral.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
