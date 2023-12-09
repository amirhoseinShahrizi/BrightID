import { GRAY9 } from '@/theme/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
};

const UpArrow = ({
  color = GRAY9,
  width = 24,
  height = 24,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.89288 7.82279C11.0534 6.66226 12.9466 6.66226 14.1071 7.82279L20.6271 14.3428C21.0176 14.7333 21.0176 15.3665 20.6271 15.757C20.2366 16.1475 19.6034 16.1475 19.2129 15.757L12.6929 9.237C12.3134 8.85752 11.6866 8.85752 11.3071 9.237L4.78709 15.757C4.39657 16.1475 3.7634 16.1475 3.37288 15.757C2.98236 15.3665 2.98236 14.7333 3.37288 14.3428L9.89288 7.82279Z" fill={color}/>
    </Svg>

);

export default UpArrow;
