export const colors = {
  // Brand
  primary: '#6D28D9',
  primaryDark: '#4C1D95',
  primaryPressed: '#5B21B6',
  primarySoft: '#EDE7FB',
  primarySoftBorder: '#DDD3F5',

  // Accents seen across the app
  gold: '#F59E0B',
  green: '#22C55E',
  danger: '#DC2626',

  // Surfaces
  screen: '#F7F7FA',
  card: '#FFFFFF',
  cardMuted: '#FBFAFF',

  // Text
  ink: '#1A1A2E',
  inkSubtle: '#6B7280',
  inkMuted: '#9CA3AF',
  onPrimary: '#FFFFFF',

  // Lines
  border: '#EEEDF3',
  divider: '#F0EFF4',

  // Misc
  shadow: '#1A1A2E',
  skeleton: '#ECEAF3',
} as const;

export type ColorName = keyof typeof colors;
