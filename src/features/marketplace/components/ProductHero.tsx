import { StyleSheet, View } from 'react-native';
import { radius, spacing } from '../../../theme';
import { ProductArt, ProductArtKey } from './ProductArt';

/**
 * Large product artwork panel at the top of the detail screen. Uses the same
 * bundled vector set as the listing cards so nothing depends on an image host.
 */
export function ProductHero({ art }: { art: ProductArtKey }) {
  return (
    <View style={styles.wrap}>
      <ProductArt art={art} size={200} rounded={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    aspectRatio: 1.4,
  },
});
