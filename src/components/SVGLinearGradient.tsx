import { LinearGradient, Stop } from 'react-native-svg';

import type { GradientOrigin, LinearGradientProps } from '../types';

interface SVGLinearGradientProps extends LinearGradientProps {
  id: string;
  size: number;
  origin?: GradientOrigin;
}

export default function SVGLinearGradient({
  id,
  size,
  origin = [0, 0],
  start = [0, 0],
  end = [1, 1],
  colors = ['black', 'white'],
  locations = [0, 1],
}: SVGLinearGradientProps) {
  return (
    <LinearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1={start[0] * size + origin[0]}
      y1={start[1] * size + origin[1]}
      x2={end[0] * size + origin[0]}
      y2={end[1] * size + origin[1]}
    >
      {colors?.map((c, i) => (
        <Stop key={i} offset={locations?.[i]} stopColor={c} stopOpacity="1" />
      ))}
    </LinearGradient>
  );
}
