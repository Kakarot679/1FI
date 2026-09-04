import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { marketplaceApi } from '../api/marketplaceApi';
import { marketplaceKeys } from '../api/queryKeys';
import { ProductSummary } from '../types';

export function useProducts() {
  return useQuery({
    queryKey: marketplaceKeys.products(),
    queryFn: marketplaceApi.getProducts,
    staleTime: 60_000,
  });
}

interface FilterOptions {
  search: string;
  category: string | null;
}

/** Client-side search + category filter over the fetched listing. */
export function useFilteredProducts({ search, category }: FilterOptions) {
  const query = useProducts();

  const products = useMemo(() => {
    const list = query.data ?? [];
    const term = search.trim().toLowerCase();

    return list.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [query.data, search, category]);

  return { ...query, products };
}

export function useCategories(): string[] {
  const { data } = useProducts();
  return useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((p: ProductSummary) => set.add(p.category));
    return Array.from(set);
  }, [data]);
}
