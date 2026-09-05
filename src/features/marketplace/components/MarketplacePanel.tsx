import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppText,
  EmptyState,
  ErrorState,
  SearchField,
  SectionHeading,
} from '../../../components';
import { BoxIcon } from '../../../components/icons';
import { colors, spacing } from '../../../theme';
import { ShopStackParamList } from '../../../navigation/types';
import { useCategories, useFilteredProducts } from '../hooks/useProducts';
import { CategoryChips } from './CategoryChips';
import { ProductCard } from './ProductCard';
import { ProductListSkeleton } from './ProductCardSkeleton';

type Nav = NativeStackNavigationProp<ShopStackParamList, 'ShopHome'>;

/**
 * The "1Fi Marketplace" body inside the Shop page. Owns its own search /
 * category state and renders loading, error, empty and populated states.
 * Rendered inside the Shop screen's ScrollView, so it maps its (small)
 * catalogue rather than nesting a FlatList.
 */
export function MarketplacePanel() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useCategories();
  const { products, isLoading, isError, refetch } = useFilteredProducts({
    search,
    category,
  });

  return (
    <View style={styles.wrap}>
      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder="Search phones, laptops, scooters…"
      />

      <View style={styles.chips}>
        <CategoryChips categories={categories} selected={category} onSelect={setCategory} />
      </View>

      <SectionHeading
        title="1Fi Marketplace"
        right={
          !isLoading && !isError ? (
            <AppText variant="subtle" color={colors.inkMuted}>
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </AppText>
          ) : null
        }
      />

      <View style={styles.list}>
        {isLoading ? (
          <ProductListSkeleton />
        ) : isError ? (
          <ErrorState
            message="We couldn’t load the marketplace. Check your connection and try again."
            onRetry={refetch}
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="No matches"
            message="Nothing here for that search yet. Try a different brand or category."
            illustration={<BoxIcon size={44} color={colors.inkMuted} />}
          />
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: product.id })
              }
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: spacing.lg },
  chips: {
    marginTop: spacing.md,
    marginHorizontal: -spacing.gutter,
    paddingHorizontal: spacing.gutter,
  },
  list: { marginTop: spacing.md },
});
