import { TextStyle } from 'react-native';

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const fontAssets = {
  PlusJakartaSans_400Regular: require('@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf'),
  PlusJakartaSans_500Medium: require('@expo-google-fonts/plus-jakarta-sans/500Medium/PlusJakartaSans_500Medium.ttf'),
  PlusJakartaSans_600SemiBold: require('@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf'),
  PlusJakartaSans_700Bold: require('@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf'),
  PlusJakartaSans_800ExtraBold: require('@expo-google-fonts/plus-jakarta-sans/800ExtraBold/PlusJakartaSans_800ExtraBold.ttf'),
};

type Variant =
  | 'screenTitle'
  | 'sectionTitle'
  | 'eyebrow'
  | 'cardTitle'
  | 'body'
  | 'bodyStrong'
  | 'subtle'
  | 'caption'
  | 'button'
  | 'price'
  | 'priceLarge';

export const text: Record<Variant, TextStyle> = {
  screenTitle: { fontFamily: fonts.extrabold, fontSize: 30, lineHeight: 36, letterSpacing: -0.4 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  eyebrow: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 16, letterSpacing: 1.4 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  subtle: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.medium, fontSize: 11, lineHeight: 14, letterSpacing: 0.3 },
  button: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 20, letterSpacing: 0.2 },
  price: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 20 },
  priceLarge: { fontFamily: fonts.extrabold, fontSize: 24, lineHeight: 28, letterSpacing: -0.3 },
};
