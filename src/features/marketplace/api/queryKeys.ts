// Central registry of React Query keys for the marketplace feature.
export const marketplaceKeys = {
  all: ['marketplace'] as const,
  products: () => [...marketplaceKeys.all, 'products'] as const,
  product: (id: string) => [...marketplaceKeys.all, 'product', id] as const,
  emiQuote: (productId: string, variantId: string) =>
    [...marketplaceKeys.all, 'emi', productId, variantId] as const,
};
