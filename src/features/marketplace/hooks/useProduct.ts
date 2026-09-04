import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '../api/marketplaceApi';
import { marketplaceKeys } from '../api/queryKeys';

export function useProduct(id: string) {
  return useQuery({
    queryKey: marketplaceKeys.product(id),
    queryFn: () => marketplaceApi.getProduct(id),
    staleTime: 60_000,
  });
}
