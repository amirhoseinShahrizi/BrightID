import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { GRAY7 } from '@/theme/colors';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

const UpRightArrow = ({ color = GRAY7, width = 16, height = 16 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.8704 4.12964C12.0432 4.3025 12.0432 4.58275 11.8704 4.7556L3.7556 12.8704C3.58275 13.0432 3.3025 13.0432 3.12964 12.8704C2.95679 12.6975 2.95679 12.4173 3.12964 12.2444L11.2444 4.12964C11.4173 3.95679 11.6975 3.95679 11.8704 4.12964Z" fill={color}/>
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M6 4.43902C6 4.19656 6.19656 4 6.43902 4H11.561C11.8034 4 12 4.19656 12 4.43902V9.56098C12 9.80344 11.8034 10 11.561 10C11.3185 10 11.122 9.80344 11.122 9.56098V4.87805H6.43902C6.19656 4.87805 6 4.68149 6 4.43902Z" fill={color}/>

  </Svg>
);

export default UpRightArrow;
