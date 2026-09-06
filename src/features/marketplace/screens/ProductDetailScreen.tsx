import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { formatPerMonth } from '../../../lib/format';
import {
  ImageCarousel,
  PriceBlock,
  ScreenHeaderBar,
  SpecList,
  StickyFooter,
  VariantSelector,
} from '../components';
import { EmiPlanPreview } from './EmiPlanPreview';
import { useProduct } from '../hooks/useProduct';
import { useEmiQuote } from '../hooks/useEmiQuote';
import { findVariant, pickDefaultPlan, pickDefaultVariant } from '../lib/selectors';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const productQuery = useProduct(productId);
  const product = productQuery.data;

  // `null` until the user taps a variant; before that we fall back to the
  // first in-stock one. Deriving it this way avoids a setState-in-effect.
  const [chosenVariantId, setChosenVariantId] = useState<string | null>(null);

  const selectedVariant = useMemo(() => {
    if (!product) return undefined;
    return findVariant(product, chosenVariantId ?? undefined) ?? pickDefaultVariant(product);
  }, [product, chosenVariantId]);

  const variantId = selectedVariant?.id;
  const quoteQuery = useEmiQuote(productId, variantId);
  const defaultPlan = useMemo(() => pickDefaultPlan(quoteQuery.data), [quoteQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={styles.screen}>
        <ScreenHeaderBar onBack={navigation.goBack} />
        <LoadingState label="Loading product" />
      </View>
    );
  }

  if (productQuery.isError || !product) {
    return (
      <View style={styles.screen}>
        <ScreenHeaderBar onBack={navigation.goBack} />
        <ErrorState message="We couldn’t load this product." onRetry={productQuery.refetch} />
      </View>
    );
  }

  const canProceed = Boolean(selectedVariant?.inStock && defaultPlan);

  return (
    <View style={styles.screen}>
      <ScreenHeaderBar title={product.name} onBack={navigation.goBack} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageCarousel images={product.images} />

        <View style={styles.header}>
          <AppText variant="caption" color={colors.inkMuted}>
            {product.brand.toUpperCase()} · {product.category.toUpperCase()}
          </AppText>
          <AppText variant="sectionTitle" style={styles.name}>
            {product.name}
          </AppText>
        </View>

        {selectedVariant ? (
          <View style={styles.block}>
            <PriceBlock price={selectedVariant.price} mrp={selectedVariant.mrp} />
          </View>
        ) : null}

        <View style={styles.block}>
          <VariantSelector
            variants={product.variants}
            selectedId={variantId}
            onSelect={setChosenVariantId}
          />
        </View>

        <View style={styles.block}>
          <EmiPlanPreview
            query={quoteQuery}
            onViewAll={() =>
              selectedVariant &&
              navigation.navigate('EmiCheckout', {
                productId,
                variantId: selectedVariant.id,
                planId: defaultPlan?.id ?? '',
              })
            }
          />
        </View>

        <View style={styles.block}>
          <AppText variant="eyebrow" color={colors.inkMuted}>
            HIGHLIGHTS
          </AppText>
          <View style={styles.highlights}>
            {product.highlights.map((line) => (
              <View key={line} style={styles.highlightRow}>
                <View style={styles.bullet} />
                <AppText variant="body" color={colors.inkSubtle} style={styles.highlightText}>
                  {line}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <Card style={styles.block}>
          <AppText variant="eyebrow" color={colors.inkMuted}>
            SPECIFICATIONS
          </AppText>
          <View style={styles.specs}>
            <SpecList specs={product.specs} />
          </View>
        </Card>

        <AppText variant="subtle" color={colors.inkMuted} style={styles.disclaimer}>
          {product.description}
        </AppText>
      </ScrollView>

      <StickyFooter>
        <View style={styles.footerRow}>
          <View style={styles.footerCopy}>
            <AppText variant="caption" color={colors.inkMuted}>
              {defaultPlan ? `${defaultPlan.months}-MONTH EMI` : 'EMI'}
            </AppText>
            <AppText variant="cardTitle">
              {defaultPlan ? formatPerMonth(defaultPlan.monthlyAmount) : '—'}
            </AppText>
          </View>
          <PrimaryButton
            label="Choose EMI plan"
            disabled={!canProceed}
            onPress={() =>
              selectedVariant &&
              navigation.navigate('EmiCheckout', {
                productId,
                variantId: selectedVariant.id,
                planId: defaultPlan?.id ?? '',
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
  header: { marginTop: spacing.xl },
  name: { marginTop: spacing.xs },
  block: { marginTop: spacing.xl },
  highlights: { marginTop: spacing.md },
  highlightRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 7,
    marginRight: spacing.md,
  },
  highlightText: { flex: 1 },
  specs: { marginTop: spacing.sm },
  disclaimer: { marginTop: spacing.xl, lineHeight: 20 },
  footerRow: { flexDirection: 'row', alignItems: 'center' },
  footerCopy: { marginRight: spacing.lg },
  footerButton: { flex: 1 },
});
