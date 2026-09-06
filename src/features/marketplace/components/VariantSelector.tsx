import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../../../components';
import { colors, radius, spacing } from '../../../theme';
import { ProductVariant } from '../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string | undefined;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  return (
    <View>
      <AppText variant="eyebrow" color={colors.inkMuted}>
        CHOOSE A VARIANT
      </AppText>
      <View style={styles.grid}>
        {variants.map((variant) => {
          const active = variant.id === selectedId;
          const disabled = !variant.inStock;
          return (
            <Pressable
              key={variant.id}
              disabled={disabled}
              onPress={() => onSelect(variant.id)}
              style={[
                styles.chip,
                active && styles.chipActive,
                disabled && styles.chipDisabled,
              ]}
            >
              <AppText
                variant="bodyStrong"
                color={
                  disabled
                    ? colors.inkMuted
                    : active
                      ? colors.primary
                      : colors.ink
                }
              >
                {variant.label}
              </AppText>
              {disabled ? (
                <AppText variant="caption" color={colors.inkMuted} style={styles.oos}>
                  Out of stock
                </AppText>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  chipDisabled: {
    backgroundColor: colors.cardMuted,
    borderStyle: 'dashed',
  },
  oos: { marginTop: 2 },
});
