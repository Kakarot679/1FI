import { EmiPlan, EmiQuote, ProductDetail, ProductVariant } from '../types';

export function pickDefaultVariant(product: ProductDetail): ProductVariant {
  return product.variants.find((v) => v.inStock) ?? product.variants[0];
}

export function findVariant(
  product: ProductDetail | undefined,
  variantId: string | undefined,
): ProductVariant | undefined {
  if (!product || !variantId) return undefined;
  return product.variants.find((v) => v.id === variantId);
}

export function pickDefaultPlan(quote: EmiQuote | undefined): EmiPlan | undefined {
  if (!quote) return undefined;
  return quote.plans.find((p) => p.recommended) ?? quote.plans[0];
}

export function findPlan(
  quote: EmiQuote | undefined,
  planId: string | undefined,
): EmiPlan | undefined {
  if (!quote || !planId) return undefined;
  return quote.plans.find((p) => p.id === planId);
}
