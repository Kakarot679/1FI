import { StyleSheet, View } from 'react-native';
import { AppText, Badge } from '../../../components';
import { colors, spacing } from '../../../theme';
import { discountPercent, formatMoney } from '../../../lib/format';

interface PriceBlockProps {
  price: number;
  mrp: number;
}

export function PriceBlock({ price, mrp }: PriceBlockProps) {
  const off = discountPercent(mrp, price);
  return (
    <View>
      <View style={styles.row}>
        <AppText variant="priceLarge">{formatMoney(price)}</AppText>
        {off > 0 ? <Badge label={`${off}% OFF`} tone="success" style={styles.badge} /> : null}
      </View>
      {off > 0 ? (
        <AppText variant="subtle" color={colors.inkMuted} style={styles.mrp}>
          M.R.P.{' '}
          <AppText variant="subtle" color={colors.inkMuted} style={styles.strike}>
            {formatMoney(mrp)}
          </AppText>{' '}
          · inclusive of all taxes
        </AppText>
      ) : (
        <AppText variant="subtle" color={colors.inkMuted} style={styles.mrp}>
          Inclusive of all taxes
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  badge: { marginLeft: spacing.md },
  mrp: { marginTop: spacing.xs },
  strike: { textDecorationLine: 'line-through' },
});
