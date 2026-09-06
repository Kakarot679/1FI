import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../components';
import { colors, spacing } from '../../../theme';
import { ProductSpec } from '../types';

export function SpecList({ specs }: { specs: ProductSpec[] }) {
  return (
    <View>
      {specs.map((spec, i) => (
        <View
          key={spec.label}
          style={[styles.row, i < specs.length - 1 && styles.divider]}
        >
          <AppText variant="body" color={colors.inkSubtle} style={styles.label}>
            {spec.label}
          </AppText>
          <AppText variant="bodyStrong" style={styles.value}>
            {spec.value}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  label: { flex: 1 },
  value: { flex: 1, textAlign: 'right' },
});
