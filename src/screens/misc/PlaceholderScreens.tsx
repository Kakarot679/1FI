import { StyleSheet, View } from 'react-native';
import { AppText } from '../../components/AppText';
import { ScreenContainer } from '../../components/ScreenContainer';
import { colors, spacing } from '../../theme';

/**
 * The other four tabs aren't part of this assignment. They render a minimal
 * "coming soon" panel so the tab bar and navigation stay coherent when the
 * reviewer taps around.
 */
function Placeholder({ title }: { title: string }) {
  return (
    <ScreenContainer>
      <View style={styles.center}>
        <AppText variant="eyebrow" color={colors.inkMuted}>
          {title.toUpperCase()}
        </AppText>
        <AppText variant="body" color={colors.inkSubtle} center style={styles.copy}>
          This screen isn’t part of the marketplace assignment. Head to the Shop
          tab to try the 1Fi Marketplace.
        </AppText>
      </View>
    </ScreenContainer>
  );
}

export const HomePlaceholderScreen = () => <Placeholder title="Home" />;
export const EmiDuesPlaceholderScreen = () => <Placeholder title="EMI Dues" />;
export const LimitPlaceholderScreen = () => <Placeholder title="Limit" />;
export const ProfilePlaceholderScreen = () => <Placeholder title="Profile" />;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  copy: { marginTop: spacing.sm, maxWidth: 300 },
});
