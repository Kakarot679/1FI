import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '../api/marketplaceApi';
import { marketplaceKeys } from '../api/queryKeys';

export function useEmiQuote(productId: string, variantId: string | undefined) {
  return useQuery({
    queryKey: marketplaceKeys.emiQuote(productId, variantId ?? 'none'),
    queryFn: () => marketplaceApi.getEmiQuote(productId, variantId as string),
    enabled: Boolean(variantId),
    staleTime: 30_000,
  });
}
