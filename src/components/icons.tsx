import Svg, { Path, Circle, Polyline } from 'react-native-svg';

interface IconProps {
  size?: number;
  color: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
});

export function HomeIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1v-8.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShopIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path
        d="M5 8h14l-1 11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 8Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M8 8V6a4 4 0 0 1 8 0v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function EmiIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path
        d="M7 3h10a1 1 0 0 1 1 1v16l-2.5-1.6L13 20l-2.5-1.6L8 20l-2.5-1.6L4 20V4a1 1 0 0 1 1-1h2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M8 8h8M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function LimitIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Polyline
        points="4,15 9,10 13,13 20,6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M15 6h5v5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ProfileIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path d="m9 6 6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 24, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path d="m15 6-6 6 6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path d="m5 13 4 4L19 7" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 18, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SparkIcon({ size = 16, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function BoxIcon({ size = 40, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M3 7.5v9L12 21l9-4.5v-9M12 12v9" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
  );
}

export function TagIcon({ size = 16, color }: IconProps) {
  return (
    <Svg {...base(size)}>
      <Path
        d="M4 13V5a1 1 0 0 1 1-1h8l7 7-9 9-7-7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={8.5} cy={8.5} r={1.5} fill={color} />
    </Svg>
  );
}
