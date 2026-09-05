import { Image, StyleSheet, View } from 'react-native';
import { AppText, Badge, Card } from '../../../components';
import { colors, spacing } from '../../../theme';
import { discountPercent, formatMoneyCompact, formatPerMonth } from '../../../lib/format';
import { ProductSummary } from '../types';

interface ProductCardProps {
  product: ProductSummary;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const off = discountPercent(product.mrp, product.startingPrice);

  return (
    <Card onPress={onPress} style={styles.card} padded={false}>
      <View style={styles.row}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.body}>
          <AppText variant="caption" color={colors.inkMuted}>
            {product.brand.toUpperCase()}
          </AppText>
          <AppText variant="cardTitle" numberOfLines={2} style={styles.name}>
            {product.name}
          </AppText>

          <View style={styles.priceRow}>
            <AppText variant="price">{formatMoneyCompact(product.startingPrice)}</AppText>
            {off > 0 ? (
              <>
                <AppText variant="subtle" color={colors.inkMuted} style={styles.strike}>
                  {formatMoneyCompact(product.mrp)}
                </AppText>
                <AppText variant="caption" color={colors.green}>
                  {off}% off
                </AppText>
              </>
            ) : null}
          </View>

          <AppText variant="subtle" color={colors.inkSubtle} style={styles.emi}>
            No-cost EMI from{' '}
            <AppText variant="bodyStrong" color={colors.ink}>
              {formatPerMonth(product.lowestEmiPerMonth)}
            </AppText>{' '}
            · {product.lowestEmiMonths} mo
          </AppText>

          {product.tags.length ? (
            <View style={styles.tags}>
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  label={tag}
                  tone={tag === 'Sold out' ? 'neutral' : tag === 'Deal' ? 'gold' : 'brand'}
                  style={styles.tag}
                />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', padding: spacing.md },
  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: 14,
    backgroundColor: colors.cardMuted,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  body: { flex: 1, marginLeft: spacing.md },
  name: { marginTop: 2 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  strike: { marginLeft: spacing.sm, textDecorationLine: 'line-through' },
  emi: { marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  tag: { marginRight: spacing.xs, marginBottom: spacing.xs },
});
