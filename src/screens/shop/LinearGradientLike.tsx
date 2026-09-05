import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme';

/**
 * Thin wrapper so the brand gradient is defined once and every hero/banner
 * uses the same angle and stops.
 */
export function LinearGradientLike({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
