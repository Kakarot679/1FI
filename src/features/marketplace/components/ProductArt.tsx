import type { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import { colors } from '../../../theme';

export type ProductArtKey =
  | 'phone'
  | 'laptop'
  | 'headphones'
  | 'scooter'
  | 'vacuum';

interface ProductArtProps {
  art: ProductArtKey;
  /** Rounded-square size. */
  size?: number;
  rounded?: number;
}

/**
 * Lightweight vector product artwork. Bundled with the app so the marketplace
 * renders identically offline and on web (no image host to depend on).
 */
export function ProductArt({ art, size = 96, rounded = 14 }: ProductArtProps) {
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: rounded }]}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F3EEFF" />
            <Stop offset="1" stopColor="#E7DEFB" />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={120} height={120} fill="url(#bg)" />
        {ART[art]}
      </Svg>
    </View>
  );
}

const P = colors.primary;
const PD = colors.primaryDark;

const ART: Record<ProductArtKey, ReactElement> = {
  phone: (
    <>
      <Rect x={42} y={24} width={36} height={72} rx={8} fill={PD} />
      <Rect x={46} y={30} width={28} height={54} rx={4} fill="#fff" />
      <Circle cx={60} cy={90} r={3} fill="#fff" />
      <Rect x={53} y={27} width={14} height={2.5} rx={1.25} fill="#fff" />
    </>
  ),
  laptop: (
    <>
      <Path d="M34 40h52a4 4 0 0 1 4 4v34H30V44a4 4 0 0 1 4-4Z" fill={PD} />
      <Rect x={36} y={46} width={48} height={28} rx={2} fill="#fff" />
      <Path d="M24 82h72l-6 8H30l-6-8Z" fill={P} />
    </>
  ),
  headphones: (
    <>
      <Path
        d="M32 66v-6a28 28 0 0 1 56 0v6"
        stroke={PD}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      <Rect x={26} y={62} width={16} height={26} rx={6} fill={P} />
      <Rect x={78} y={62} width={16} height={26} rx={6} fill={P} />
    </>
  ),
  scooter: (
    <>
      <Circle cx={38} cy={84} r={12} fill="none" stroke={PD} strokeWidth={6} />
      <Circle cx={86} cy={84} r={12} fill="none" stroke={PD} strokeWidth={6} />
      <Path
        d="M38 84 62 50h10"
        stroke={P}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M60 50h26l-8 34" stroke={P} strokeWidth={6} fill="none" strokeLinecap="round" />
      <Path d="M70 44h14" stroke={PD} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
  vacuum: (
    <>
      <Path
        d="M54 26 68 30 58 92a6 6 0 0 1-12 0L54 26Z"
        fill={PD}
      />
      <Rect x={40} y={86} width={40} height={10} rx={5} fill={P} />
      <Circle cx={60} cy={40} r={5} fill="#fff" />
    </>
  ),
};

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', backgroundColor: colors.cardMuted },
});
