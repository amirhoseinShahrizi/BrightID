import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { GRAY9, ERROR } from '@/theme/colors';

type Props = {
  color?: string;
  alert?: boolean;
  width?: number;
  height?: number;
};

const NotificationBell = ({
  color = GRAY9,
  alert = false,
  width = 27,
  height = 28,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 27 28" fill="none">
    {alert ?
        <Circle cx="4" cy="4" r="4" fill={ERROR}/>
    : null}
    
    <Path d="M12.02 2.90997C8.70997 2.90997 6.01997 5.59997 6.01997 8.90997V11.8C6.01997 12.41 5.75997 13.34 5.44997 13.86L4.29997 15.77C3.58997 16.95 4.07997 18.26 5.37997 18.7C9.68997 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.90997C18.02 5.60997 15.32 2.90997 12.02 2.90997Z" 
        stroke={color} 
        stroke-width="2" 
        stroke-miterlimit="10" 
        stroke-linecap="round"
    />
    <Path d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z" 
        stroke={color} 
        stroke-width="2" 
        stroke-miterlimit="10" 
        stroke-linecap="round" 
        stroke-linejoin="round"
    />
    <Path d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.90002 21.18C9.36002 20.64 9.02002 19.88 9.02002 19.06" 
        stroke={color} 
        stroke-width="2" 
        stroke-miterlimit="10"
    />

    
  </Svg>
);

export default NotificationBell;
