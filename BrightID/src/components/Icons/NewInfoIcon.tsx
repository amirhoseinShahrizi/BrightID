import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { GRAY8 } from '@/theme/colors';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

const Info = ({ color = GRAY8, width = 24, height = 24 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.94772 5.94772 1 12 1C18.0523 1 23 5.94772 23 12C23 18.0523 18.0523 23 12 23C5.94772 23 1 18.0523 1 12ZM12 3C7.05228 3 3 7.05228 3 12C3 16.9477 7.05228 21 12 21C16.9477 21 21 16.9477 21 12C21 7.05228 16.9477 3 12 3Z" fill={color}/>
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" fill={color}/>
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.9945 8C10.9945 7.44772 11.4422 7 11.9945 7H12.0035C12.5558 7 13.0035 7.44772 13.0035 8C13.0035 8.55228 12.5558 9 12.0035 9H11.9945C11.4422 9 10.9945 8.55228 10.9945 8Z" fill={color}/>
  </Svg>
);

export default Info;
