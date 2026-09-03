import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { AppText } from './AppText';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * The light-purple track with a white active pill + purple underline,
 * matching the "Top Brands / Nearby Stores" switch on the Shop page.
 * Scrolls horizontally once a third segment is added.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const scrollable = options.length > 2;

  const body = useMemo(
    () =>
      options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.segmentActive, scrollable && styles.segmentFlexible]}
          >
            <AppText
              variant="bodyStrong"
              color={active ? colors.primary : colors.inkSubtle}
            >
              {option.label}
            </AppText>
            {active ? <View style={styles.underline} /> : null}
          </Pressable>
        );
      }),
    [options, value, scrollable, onChange],
  );

  if (!scrollable) {
    return <View style={styles.track}>{body}</View>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.trackScroll}
    >
      {body}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    padding: 6,
  },
  trackScroll: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    padding: 6,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
  },
  segmentFlexible: { flex: 0, paddingHorizontal: spacing.xl },
  segmentActive: {
    backgroundColor: colors.card,
  },
  underline: {
    marginTop: 3,
    width: 22,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
