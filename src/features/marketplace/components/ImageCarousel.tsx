import { useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../../../theme';

interface ImageCarouselProps {
  images: string[];
  horizontalPadding?: number;
}

export function ImageCarousel({ images, horizontalPadding = spacing.gutter }: ImageCarouselProps) {
  const { width } = useWindowDimensions();
  const slideWidth = width - horizontalPadding * 2;
  const [index, setIndex] = useState(0);
  const ref = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / slideWidth);
    if (next !== index) setIndex(next);
  };

  return (
    <View>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEnabled={images.length > 1}
      >
        {images.map((uri) => (
          <View key={uri} style={[styles.slide, { width: slideWidth }]}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>

      {images.length > 1 ? (
        <View style={styles.dots}>
          {images.map((uri, i) => (
            <View key={uri} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    aspectRatio: 1.1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.cardMuted,
  },
  image: { width: '100%', height: '100%' },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: { backgroundColor: colors.primary, width: 18 },
});
