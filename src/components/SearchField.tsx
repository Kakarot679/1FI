import { StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { colors, radius, shadows, spacing } from '../theme';
import { fonts } from '../theme/typography';

interface SearchFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export function SearchField({ value, onChangeText, placeholder = 'Search…' }: SearchFieldProps) {
  return (
    <View style={styles.wrap}>
      <SearchIcon />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.inkMuted}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
      />
    </View>
  );
}

function SearchIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={colors.inkMuted} strokeWidth={2} />
      <Line x1={16.5} y1={16.5} x2={21} y2={21} stroke={colors.inkMuted} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadows.card,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 0,
  },
});
