import EditorialShell, { Palette } from '../_components/EditorialShell';

const palette: Palette = {
  key: 'ink-bone',
  displayName: 'Ink & Bone',
  bg: '#13110F',
  fg: '#EDE6D6',
  fgMuted: '#A8A095',
  fgFaint: '#6B635A',
  accent: '#B8743D',
  hairline: 'rgba(237, 230, 214, 0.14)',
  cardBg: 'rgba(237, 230, 214, 0.04)',
  // Company logos are dark marks on white tiles — desaturate, invert, soften
  logoFilter: 'grayscale(1) invert(1) brightness(1.05) contrast(0.9)',
  vignette: 'rgba(184, 116, 61, 0.06)',
};

export default function Page() {
  return <EditorialShell palette={palette} />;
}
