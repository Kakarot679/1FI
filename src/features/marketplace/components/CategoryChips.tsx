import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { AppText } from '../../../components';
import { colors, radius, spacing } from '../../../theme';

interface CategoryChipsProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  const options = ['All', ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((label) => {
        const value = label === 'All' ? null : label;
        const active = selected === value;
        return (
          <Pressable
            key={label}
            onPress={() => onSelect(value)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <AppText
              variant="bodyStrong"
              color={active ? colors.onPrimary : colors.inkSubtle}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingRight: spacing.lg, gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
