import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { colors, spacing } from '../../theme';

/**
 * Shared body for the two Shop sub-tabs that the assignment leaves blank
 * (Top Brands, Nearby Stores).
 */
export function ComingSoonPanel({ label }: { label: string }) {
  return (
    <View style={styles.wrap}>
      <AppText variant="eyebrow" color={colors.inkMuted}>
        {label.toUpperCase()}
      </AppText>
      <AppText variant="body" color={colors.inkSubtle} center style={styles.copy}>
        Coming soon.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl * 2,
  },
  copy: { marginTop: spacing.sm },
});
