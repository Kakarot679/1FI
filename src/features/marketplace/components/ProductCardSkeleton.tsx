import { StyleSheet, View } from 'react-native';
import { Card, Skeleton } from '../../../components';
import { spacing } from '../../../theme';

export function ProductCardSkeleton() {
  return (
    <Card style={styles.card} padded={false}>
      <View style={styles.row}>
        <Skeleton width={96} height={96} style={styles.image} />
        <View style={styles.body}>
          <Skeleton width="40%" height={10} />
          <Skeleton width="80%" height={16} style={styles.gap} />
          <Skeleton width="55%" height={14} style={styles.gap} />
          <Skeleton width="70%" height={12} style={styles.gap} />
        </View>
      </View>
    </Card>
  );
}

export function ProductListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', padding: spacing.md },
  image: { borderRadius: 14 },
  body: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
  gap: { marginTop: spacing.sm },
});
