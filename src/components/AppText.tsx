import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, text } from '../theme';

type Variant = keyof typeof text;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  center?: boolean;
}

/**
 * Single place that applies the Plus Jakarta font + type scale.
 * Everything in the app renders text through this so weights stay consistent.
 */
export function AppText({
  variant = 'body',
  color = colors.ink,
  center,
  style,
  ...rest
}: AppTextProps) {
  return (
    <RNText
      style={[text[variant], { color }, center && styles.center, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
});
