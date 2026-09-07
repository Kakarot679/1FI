import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import { SegmentedControl } from '../../components';
import type { SegmentOption } from '../../components';
import { colors, spacing } from '../../theme';
import { marketplaceKeys } from '../../features/marketplace/api/queryKeys';
import { MarketplacePanel } from '../../features/marketplace/components/MarketplacePanel';
import { ComingSoonPanel } from './ComingSoonPanel';
import { ShopHero } from './ShopHero';

type ShopSection = 'brands' | 'nearby' | 'marketplace';

const SECTIONS: SegmentOption<ShopSection>[] = [
  { value: 'brands', label: 'Top Brands' },
  { value: 'nearby', label: 'Nearby Stores' },
  { value: 'marketplace', label: 'Marketplace' },
];

// Space for the floating tab bar so content never sits under it.
const TAB_BAR_CLEARANCE = 108;

export function ShopHomeScreen() {
  const [section, setSection] = useState<ShopSection>('marketplace');
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (section !== 'marketplace') return;
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: marketplaceKeys.all });
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, section]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <ShopHero />

        <View style={styles.segment}>
          <SegmentedControl options={SECTIONS} value={section} onChange={setSection} />
        </View>

        {section === 'marketplace' && <MarketplacePanel />}
        {section === 'brands' && <ComingSoonPanel label="Top Brands" />}
        {section === 'nearby' && <ComingSoonPanel label="Nearby Stores" />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.screen },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
    paddingBottom: TAB_BAR_CLEARANCE,
  },
  segment: { marginTop: spacing.lg },
});
