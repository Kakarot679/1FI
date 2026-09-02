import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';
import { AppText } from './AppText';

type Tone = 'neutral' | 'brand' | 'success' | 'gold';

interface BadgeProps {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
}

// Small pill label ("505 KM", "EARN ₹500", "NO-COST EMI").
export function Badge({ label, tone = 'neutral', style }: BadgeProps) {
  const palette = TONES[tone];
  return (
    <View style={[styles.base, { backgroundColor: palette.bg }, style]}>
      <AppText variant="caption" color={palette.fg}>
        {label}
      </AppText>
    </View>
  );
}

const TONES: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: '#F1F0F6', fg: colors.inkSubtle },
  brand: { bg: colors.primarySoft, fg: colors.primary },
  success: { bg: '#E7F8EE', fg: '#15803D' },
  gold: { bg: '#FEF3E2', fg: '#B45309' },
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
});
