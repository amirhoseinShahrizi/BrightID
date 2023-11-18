import { GRAY9 } from '@/theme/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
};

const Filter = ({
  color = GRAY9,
  width = 24,
  height = 24,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H3C2.44772 8 2 7.55228 2 7Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill={color}/>
    </Svg>

);

export default Filter;
