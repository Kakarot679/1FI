import { Pressable, StyleSheet, View } from 'react-native';
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
 * Segments share the width equally.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View style={styles.track}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <AppText
              variant="bodyStrong"
              numberOfLines={1}
              color={active ? colors.primary : colors.inkSubtle}
              style={styles.label}
            >
              {option.label}
            </AppText>
            {active ? <View style={styles.underline} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    padding: 5,
  },
  segment: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
  },
  segmentActive: {
    backgroundColor: colors.card,
  },
  label: { fontSize: 13 },
  underline: {
    marginTop: 3,
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
