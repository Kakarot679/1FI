import { useEffect, useState } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  style?: StyleProp<ViewStyle>;
  round?: boolean;
}

// Pulsing placeholder block used while product data loads.
export function Skeleton({ width = '100%', height = 16, style, round }: SkeletonProps) {
  const [pulse] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        styles.base,
        { width, height, borderRadius: round ? height / 2 : radius.sm, opacity: pulse },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: colors.skeleton },
});
