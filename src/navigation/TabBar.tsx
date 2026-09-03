import type { ReactElement } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import {
  EmiIcon,
  HomeIcon,
  LimitIcon,
  ProfileIcon,
  ShopIcon,
} from '../components/icons';
import { colors, radius, shadows, spacing } from '../theme';

const ICONS: Record<string, (p: { size?: number; color: string }) => ReactElement> = {
  Home: HomeIcon,
  Shop: ShopIcon,
  EmiDues: EmiIcon,
  Limit: LimitIcon,
  Profile: ProfileIcon,
};

const LABELS: Record<string, string> = {
  Home: 'Home',
  Shop: 'Shop',
  EmiDues: 'EMI Dues',
  Limit: 'Limit',
  Profile: 'Profile',
};

/**
 * Floating white pill tab bar with a short purple indicator above the active
 * icon, matching the 1Fi app chrome.
 */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = ICONS[route.name];
          const tint = focused ? colors.primary : colors.inkMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={LABELS[route.name]}
              onPress={onPress}
              style={styles.tab}
            >
              <View style={styles.indicatorSlot}>
                {focused ? <View style={styles.indicator} /> : null}
              </View>
              <Icon size={24} color={tint} />
              <AppText variant="caption" color={tint} style={styles.label}>
                {LABELS[route.name]}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    paddingVertical: spacing.sm,
    ...shadows.floating,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: spacing.xs },
  indicatorSlot: { height: 6, justifyContent: 'center', marginBottom: 4 },
  indicator: {
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  label: { marginTop: 4 },
});
