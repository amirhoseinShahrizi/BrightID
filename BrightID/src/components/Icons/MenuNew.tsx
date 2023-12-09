import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { GRAY9 } from '@/theme/colors';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

const Menu = ({ color = GRAY9, width = 24, height = 24 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H3C2.44772 8 2 7.55228 2 7Z" 
        fill={color}
    />
    <Path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" 
        fill={color}
    />
    <Path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M2 17C2 16.4477 2.44772 16 3 16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H3C2.44772 18 2 17.5523 2 17Z" 
        fill={color}
    />

  </Svg>
);

export default Menu;
