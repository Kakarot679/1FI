import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Badge } from '../../../components';
import { CheckIcon } from '../../../components/icons';
import { colors, radius, spacing } from '../../../theme';
import { formatMoney, formatMoneyCompact } from '../../../lib/format';
import { EmiPlan } from '../types';

interface EmiPlanCardProps {
  plan: EmiPlan;
  selected: boolean;
  onSelect: () => void;
}

export function EmiPlanCard({ plan, selected, onSelect }: EmiPlanCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onSelect}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.left}>
        <View style={[styles.radio, selected && styles.radioOn]}>
          {selected ? <CheckIcon size={12} color={colors.onPrimary} /> : null}
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <AppText variant="cardTitle">
            {formatMoneyCompact(plan.monthlyAmount)}
            <AppText variant="subtle" color={colors.inkSubtle}>
              {'  '}/mo
            </AppText>
          </AppText>
          {plan.recommended ? <Badge label="POPULAR" tone="brand" /> : null}
        </View>

        <AppText variant="subtle" color={colors.inkSubtle} style={styles.sub}>
          {plan.months} months ·{' '}
          {plan.noCost ? 'No-cost EMI' : `${plan.interestRate}% p.a.`}
        </AppText>

        <View style={styles.metaRow}>
          <Meta label="Total payable" value={formatMoney(plan.totalPayable)} />
          <Meta
            label="Processing fee"
            value={plan.processingFee === 0 ? 'Free' : formatMoney(plan.processingFee)}
          />
        </View>
      </View>
    </Pressable>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <AppText variant="caption" color={colors.inkMuted}>
        {label.toUpperCase()}
      </AppText>
      <AppText variant="bodyStrong" style={styles.metaValue}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginBottom: spacing.md,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  left: { marginRight: spacing.md, paddingTop: 2 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.inkMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  body: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sub: { marginTop: 2 },
  metaRow: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.xl },
  meta: {},
  metaValue: { marginTop: 2 },
});
