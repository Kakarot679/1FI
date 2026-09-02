import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, text } from '../theme';
import { AppText } from './AppText';

type Variant = 'solid' | 'outline';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  trailingIcon?: React.ReactNode;
}

// The full-width pill CTA used throughout 1Fi ("Fetch my portfolio", "Check eligibility").
export function PrimaryButton({
  label,
  onPress,
  variant = 'solid',
  disabled,
  loading,
  style,
  trailingIcon,
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.solid,
        pressed && !isDisabled && (isOutline ? styles.outlinePressed : styles.solidPressed),
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.onPrimary} />
      ) : (
        <View style={styles.row}>
          <AppText
            variant="button"
            color={isOutline ? colors.primary : colors.onPrimary}
            style={text.button}
          >
            {label}
          </AppText>
          {trailingIcon ? <View style={styles.icon}>{trailingIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { marginLeft: 8 },
  solid: { backgroundColor: colors.primary },
  solidPressed: { backgroundColor: colors.primaryPressed },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.primarySoftBorder,
  },
  outlinePressed: { backgroundColor: colors.primarySoft },
  disabled: { opacity: 0.45 },
});
