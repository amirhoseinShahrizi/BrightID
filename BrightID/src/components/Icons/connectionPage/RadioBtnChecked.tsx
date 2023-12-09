import { ACTION } from '@/theme/colors';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
};

const RadioBtnChecked = ({
  color = ACTION,
  width = 20,
  height = 21,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 20 21" fill="none">
        <G clip-path="url(#clip0_4129_1054)">
        <Path d="M7.49999 18.9999H12.5C16.6667 18.9999 18.3333 17.3333 18.3333 13.1666V8.16658C18.3333 3.99992 16.6667 2.33325 12.5 2.33325H7.49999C3.33332 2.33325 1.66666 3.99992 1.66666 8.16658V13.1666C1.66666 17.3333 3.33332 18.9999 7.49999 18.9999Z" fill={color} stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M13.984 7.8668C14.2279 8.11109 14.2275 8.50682 13.9832 8.75068L9.25823 13.4673C9.01409 13.7111 8.61866 13.7109 8.37474 13.467L6.0164 11.1086C5.77232 10.8645 5.77232 10.4688 6.0164 10.2247C6.26048 9.98066 6.65621 9.98066 6.90029 10.2247L8.81707 12.1415L13.1001 7.86602C13.3444 7.62216 13.7401 7.62251 13.984 7.8668Z" fill="white"/>
        </G>
        <Defs>
        <ClipPath id="clip0_4129_1054">
        <Rect width="20" height="20" fill="white" transform="translate(0 0.666504)"/>
        </ClipPath>
        </Defs>
    </Svg>

);

export default RadioBtnChecked;
