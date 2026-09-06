import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components';
import { ChevronLeftIcon } from '../../../components/icons';
import { colors, hitSlop, spacing } from '../../../theme';

interface ScreenHeaderBarProps {
  title?: string;
  onBack: () => void;
}

/** Back-chevron + centered title, the detail-screen header used across 1Fi. */
export function ScreenHeaderBar({ title, onBack }: ScreenHeaderBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm }]}>
      <Pressable onPress={onBack} hitSlop={hitSlop} style={styles.back}>
        <ChevronLeftIcon size={24} color={colors.ink} />
      </Pressable>
      {title ? (
        <AppText variant="bodyStrong" numberOfLines={1} style={styles.title}>
          {title}
        </AppText>
      ) : null}
      <View style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.md,
    backgroundColor: colors.screen,
  },
  back: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center' },
});
