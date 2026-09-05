import { StyleSheet, View } from 'react-native';
import { LinearGradientLike } from './LinearGradientLike';
import { AppText } from '../../components/AppText';
import { SparkIcon } from '../../components/icons';
import { colors, radius, spacing } from '../../theme';

/**
 * Purple hero banner at the top of the Shop page:
 * "Shop today, Pay later using Mutual funds."
 */
export function ShopHero() {
  return (
    <LinearGradientLike style={styles.card}>
      <View style={styles.badge}>
        <SparkIcon size={14} color={colors.onPrimary} />
        <AppText variant="caption" color={colors.onPrimary} style={styles.badgeText}>
          NO-COST EMIs
        </AppText>
      </View>

      <AppText variant="screenTitle" color={colors.onPrimary} style={styles.title}>
        Shop today,{'\n'}pay later using{'\n'}mutual funds.
      </AppText>

      <AppText variant="subtle" color="rgba(255,255,255,0.82)" style={styles.subtitle}>
        No credit score required. No interest. Backed by your investments.
      </AppText>
    </LinearGradientLike>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  badgeText: { marginLeft: 6, letterSpacing: 1 },
  title: { marginTop: spacing.lg },
  subtitle: { marginTop: spacing.md, maxWidth: 260 },
});
