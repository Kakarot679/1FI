import { Pressable, StyleSheet, View } from 'react-native';
import type { UseQueryResult } from '@tanstack/react-query';
import { AppText, Skeleton } from '../../../components';
import { ArrowRightIcon } from '../../../components/icons';
import { colors, spacing } from '../../../theme';
import { formatMoney, formatPerMonth } from '../../../lib/format';
import { EmiQuote } from '../types';

interface EmiPlanPreviewProps {
  query: UseQueryResult<EmiQuote>;
  onViewAll: () => void;
}

/**
 * Compact EMI summary on the product screen: shows the cheapest monthly figure
 * and a count of available tenures, linking through to the full plan picker.
 */
export function EmiPlanPreview({ query, onViewAll }: EmiPlanPreviewProps) {
  const { data, isLoading, isError } = query;

  return (
    <View>
      <View style={styles.headerRow}>
        <AppText variant="eyebrow" color={colors.inkMuted}>
          EMI OPTIONS
        </AppText>
        {data ? (
          <Pressable onPress={onViewAll} style={styles.link}>
            <AppText variant="bodyStrong" color={colors.primary}>
              View all
            </AppText>
            <ArrowRightIcon size={16} color={colors.primary} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.body}>
        {isLoading ? (
          <>
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={12} style={styles.gap} />
          </>
        ) : isError || !data ? (
          <AppText variant="body" color={colors.inkSubtle}>
            EMI plans are unavailable for this variant right now.
          </AppText>
        ) : (
          <>
            <AppText variant="cardTitle">
              From {formatPerMonth(minMonthly(data))}
            </AppText>
            <AppText variant="subtle" color={colors.inkSubtle} style={styles.gap}>
              {data.plans.length} tenures · no-cost from{' '}
              {noCostMonths(data)} months · principal {formatMoney(data.principal)}
            </AppText>
          </>
        )}
      </View>
    </View>
  );
}

function minMonthly(quote: EmiQuote): number {
  return quote.plans.reduce((min, p) => Math.min(min, p.monthlyAmount), Infinity);
}

function noCostMonths(quote: EmiQuote): number {
  const noCost = quote.plans.filter((p) => p.noCost).map((p) => p.months);
  return noCost.length ? Math.min(...noCost) : quote.plans[0].months;
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  body: { marginTop: spacing.md },
  gap: { marginTop: 4 },
});
