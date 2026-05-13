import EditorialShell, { Palette } from '../_components/EditorialShell';

const palette: Palette = {
  key: 'bone-espresso',
  displayName: 'Bone & Espresso',
  bg: '#F2ECDF',
  fg: '#1A1612',
  fgMuted: '#5E544A',
  fgFaint: '#8A8074',
  accent: '#8C2E2A',
  hairline: 'rgba(26, 22, 18, 0.16)',
  cardBg: 'rgba(26, 22, 18, 0.04)',
  // Company logos look fine native on light background — just slight desaturation
  logoFilter: 'grayscale(1) brightness(0.55) contrast(1.1)',
  vignette: 'rgba(140, 46, 42, 0.04)',
};

export default function Page() {
  return <EditorialShell palette={palette} />;
}
