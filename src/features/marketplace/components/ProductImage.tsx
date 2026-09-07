import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors, radius } from '../../../theme';
import { ProductImageKey, resolveProductImage } from '../assets/images';

interface ProductImageProps {
  imageKey: ProductImageKey;
  /** Square edge for the thumbnail form. */
  size?: number;
  rounded?: number;
  /** When true, fills its parent instead of being a fixed square. */
  fill?: boolean;
}

/**
 * Renders a bundled product photo. Shows a tinted placeholder while the image
 * decodes and if it ever fails to load.
 */
export function ProductImage({ imageKey, size = 96, rounded = 14, fill }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const boxStyle = fill
    ? styles.fill
    : { width: size, height: size, borderRadius: rounded };

  return (
    <View style={[styles.wrap, boxStyle]}>
      {!failed ? (
        <Image
          source={resolveProductImage(imageKey)}
          style={styles.image}
          resizeMode="cover"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
        />
      ) : null}
      {(!loaded || failed) && <View style={styles.placeholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: colors.cardMuted,
  },
  fill: { flex: 1, borderRadius: radius.xl },
  image: { width: '100%', height: '100%' },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primarySoft,
  },
});
