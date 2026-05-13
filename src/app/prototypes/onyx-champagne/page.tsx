import EditorialShell, { Palette } from '../_components/EditorialShell';

const palette: Palette = {
  key: 'onyx-champagne',
  displayName: 'Onyx & Champagne',
  bg: '#0E0E10',
  fg: '#E8DCC0',
  fgMuted: '#A89F88',
  fgFaint: '#6B6452',
  accent: '#C9A961',
  hairline: 'rgba(232, 220, 192, 0.12)',
  cardBg: 'rgba(232, 220, 192, 0.04)',
  // Dark mode: invert dark company logos to render on dark background
  logoFilter: 'grayscale(1) invert(1) brightness(0.95) contrast(0.85)',
  vignette: 'rgba(201, 169, 97, 0.06)',
};

export default function Page() {
  return <EditorialShell palette={palette} />;
}
