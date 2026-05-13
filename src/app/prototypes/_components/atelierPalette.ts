import type { Palette } from './EditorialShell';

/**
 * The shipped Atelier palette: deep walnut, ivory cream, whiskey brass, moss.
 * Imported by both `/` (homepage) and `/prototypes/atelier` so we have a single
 * source of truth.
 */
export const atelierPalette: Palette = {
  key: 'atelier',
  displayName: 'Atelier, concert hall',
  bg: '#170E07',
  fg: '#F4ECCF',
  fgMuted: '#D6C8A2',
  fgFaint: '#A6916C',
  accent: '#D6A24A',
  secondary: '#86A37B',
  warmTint: 'rgba(166, 109, 55, 0.07)',
  hairline: 'rgba(244, 236, 207, 0.09)',
  cardBg: 'rgba(244, 236, 207, 0.04)',
  logoFilter: 'grayscale(1) invert(1) brightness(0.95) contrast(0.85) sepia(0.18)',
  vignette: 'rgba(214, 162, 74, 0.08)',
};
