import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppText,
  Card,
  LoadingState,
  PrimaryButton,
} from '../../../components';
import { CheckIcon } from '../../../components/icons';
import { colors, radius, spacing } from '../../../theme';
import { ShopStackParamList } from '../../../navigation/types';
import { formatMoney } from '../../../lib/format';
import { StickyFooter } from '../components';
import { useProduct } from '../hooks/useProduct';
import { useEmiQuote } from '../hooks/useEmiQuote';
import { findPlan, findVariant } from '../lib/selectors';

type Props = NativeStackScreenProps<ShopStackParamList, 'OrderConfirmed'>;

/** Client-side placeholder order id for the mocked confirmation. */
function makeReference(): string {
  const now = Date.now().toString(36).toUpperCase();
  return `1FI-${now.slice(-6)}`;
}

/**
 * Terminal screen of the marketplace flow. The order itself is mocked — this
 * confirms the selection and drops the user back to the Shop page.
 */
export function OrderConfirmedScreen({ route, navigation }: Props) {
  const { productId, variantId, planId } = route.params;
  const productQuery = useProduct(productId);
  const quoteQuery = useEmiQuote(productId, variantId);

  const product = productQuery.data;
  const variant = useMemo(() => findVariant(product, variantId), [product, variantId]);
  const plan = findPlan(quoteQuery.data, planId);

  const [reference] = useState(makeReference);

  if (productQuery.isLoading || quoteQuery.isLoading || !product || !variant || !plan) {
    return (
      <View style={styles.screen}>
        <LoadingState label="Confirming your plan" />
      </View>
    );
  }

  const backToShop = () =>
    navigation.reset({ index: 0, routes: [{ name: 'ShopHome' }] });

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.tick}>
          <CheckIcon size={30} color={colors.onPrimary} />
        </View>

        <AppText variant="sectionTitle" center style={styles.title}>
          Plan confirmed
        </AppText>
        <AppText variant="body" color={colors.inkSubtle} center style={styles.subtitle}>
          Your {plan.noCost ? 'no-cost ' : ''}EMI request has been placed. We’ll
          pledge the required mutual fund units and share the order details
          shortly.
        </AppText>

        <Card style={styles.card}>
          <Row label="Reference" value={reference} />
          <Divider />
          <Row label="Product" value={product.name} />
          <Divider />
          <Row label="Variant" value={variant.label} />
          <Divider />
          <Row
            label="Plan"
            value={`${plan.months} months · ${plan.noCost ? 'No-cost' : `${plan.interestRate}% p.a.`}`}
          />
          <Divider />
          <Row label="Monthly" value={`${formatMoney(plan.monthlyAmount)}/mo`} />
          <Divider />
          <Row label="Total payable" value={formatMoney(plan.totalPayable)} strong />
        </Card>
      </View>

      <StickyFooter>
        <PrimaryButton label="Back to Shop" onPress={backToShop} />
      </StickyFooter>
    </View>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={styles.row}>
      <AppText variant="body" color={colors.inkSubtle}>
        {label}
      </AppText>
      <AppText
        variant={strong ? 'price' : 'bodyStrong'}
        style={styles.rowValue}
        numberOfLines={1}
      >
        {value}
      </AppText>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.screen },
  content: {
    flex: 1,
    paddingHorizontal: spacing.gutter,
    justifyContent: 'center',
  },
  tick: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginTop: spacing.xl },
  subtitle: { marginTop: spacing.md, maxWidth: 320, alignSelf: 'center' },
  card: { marginTop: spacing.xxl },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowValue: { flexShrink: 1, marginLeft: spacing.lg, textAlign: 'right' },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
});
