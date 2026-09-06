import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Card,
  ErrorState,
  LoadingState,
  PrimaryButton,
} from '../../../components';
import { colors, spacing } from '../../../theme';
import { ShopStackParamList } from '../../../navigation/types';
import { formatMoney } from '../../../lib/format';
import { EmiPlanCard, ScreenHeaderBar, StickyFooter } from '../components';
import { useProduct } from '../hooks/useProduct';
import { useEmiQuote } from '../hooks/useEmiQuote';
import { findPlan, findVariant, pickDefaultPlan } from '../lib/selectors';

type Props = NativeStackScreenProps<ShopStackParamList, 'EmiCheckout'>;

export function EmiCheckoutScreen({ route, navigation }: Props) {
  const { productId, variantId, planId: initialPlanId } = route.params;

  const productQuery = useProduct(productId);
  const quoteQuery = useEmiQuote(productId, variantId);

  const product = productQuery.data;
  const quote = quoteQuery.data;
  const variant = useMemo(() => findVariant(product, variantId), [product, variantId]);

  // `null` until the user taps a plan. The effective selection falls back to
  // the plan passed in the route params, then the recommended plan.
  const [chosenPlanId, setChosenPlanId] = useState<string | null>(null);

  const selectedPlan = useMemo(() => {
    if (!quote) return undefined;
    return (
      findPlan(quote, chosenPlanId ?? undefined) ??
      findPlan(quote, initialPlanId || undefined) ??
      pickDefaultPlan(quote)
    );
  }, [quote, chosenPlanId, initialPlanId]);

  const planId = selectedPlan?.id;

  const loading = productQuery.isLoading || quoteQuery.isLoading;
  const errored = productQuery.isError || quoteQuery.isError;

  if (loading) {
    return (
      <View style={styles.screen}>
        <ScreenHeaderBar title="Choose a plan" onBack={navigation.goBack} />
        <LoadingState label="Fetching EMI plans" />
      </View>
    );
  }

  if (errored || !product || !variant || !quote) {
    return (
      <View style={styles.screen}>
        <ScreenHeaderBar title="Choose a plan" onBack={navigation.goBack} />
        <ErrorState
          message="We couldn’t fetch EMI plans for this item."
          onRetry={() => {
            productQuery.refetch();
            quoteQuery.refetch();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeaderBar title="Choose a plan" onBack={navigation.goBack} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.summary} padded={false}>
          <View style={styles.summaryRow}>
            <Image source={{ uri: product.images[0] }} style={styles.thumb} />
            <View style={styles.summaryBody}>
              <AppText variant="bodyStrong" numberOfLines={1}>
                {product.name}
              </AppText>
              <AppText variant="subtle" color={colors.inkSubtle}>
                {variant.label}
              </AppText>
              <AppText variant="price" style={styles.summaryPrice}>
                {formatMoney(variant.price)}
              </AppText>
            </View>
          </View>
        </Card>

        <AppText variant="eyebrow" color={colors.inkMuted} style={styles.sectionLabel}>
          SELECT AN EMI PLAN
        </AppText>

        <View style={styles.plans}>
          {quote.plans.map((plan) => (
            <EmiPlanCard
              key={plan.id}
              plan={plan}
              selected={plan.id === planId}
              onSelect={() => setChosenPlanId(plan.id)}
            />
          ))}
        </View>

        <AppText variant="subtle" color={colors.inkMuted} style={styles.finePrint}>
          EMIs are backed by your pledged mutual fund units. No-cost plans are
          subsidised by 1Fi — you repay exactly the item price. Interest-bearing
          plans show the total payable including interest and any processing fee.
        </AppText>
      </ScrollView>

      <StickyFooter>
        <View style={styles.footerRow}>
          <View style={styles.footerCopy}>
            <AppText variant="caption" color={colors.inkMuted}>
              {selectedPlan ? `${selectedPlan.months} MONTHS` : 'SELECT A PLAN'}
            </AppText>
            <AppText variant="cardTitle">
              {selectedPlan ? `${formatMoney(selectedPlan.monthlyAmount)}/mo` : '—'}
            </AppText>
          </View>
          <PrimaryButton
            label="Proceed"
            disabled={!selectedPlan}
            onPress={() =>
              selectedPlan &&
              navigation.navigate('OrderConfirmed', {
                productId,
                variantId,
                planId: selectedPlan.id,
              })
            }
            style={styles.footerButton}
          />
        </View>
      </StickyFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.screen },
  content: { paddingHorizontal: spacing.gutter, paddingBottom: spacing.xxxl },
  summary: { padding: spacing.md },
  summaryRow: { flexDirection: 'row', padding: spacing.md },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.cardMuted,
  },
  summaryBody: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
  summaryPrice: { marginTop: spacing.xs },
  sectionLabel: { marginTop: spacing.xl },
  plans: { marginTop: spacing.md },
  finePrint: { marginTop: spacing.sm, lineHeight: 18 },
  footerRow: { flexDirection: 'row', alignItems: 'center' },
  footerCopy: { marginRight: spacing.lg },
  footerButton: { flex: 1 },
});
