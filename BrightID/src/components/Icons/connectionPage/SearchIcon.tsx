import { GRAY6 } from '@/theme/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
};

const SearchIcon = ({
  color = GRAY6,
  width = 16,
  height = 16,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.66671 1.83325C4.44505 1.83325 1.83337 4.44492 1.83337 7.66659C1.83337 10.8882 4.44505 13.4999 7.66671 13.4999C10.8884 13.4999 13.5 10.8882 13.5 7.66659C13.5 4.44492 10.8884 1.83325 7.66671 1.83325ZM0.833374 7.66659C0.833374 3.89264 3.89276 0.833252 7.66671 0.833252C11.4407 0.833252 14.5 3.89264 14.5 7.66659C14.5 11.4405 11.4407 14.4999 7.66671 14.4999C3.89276 14.4999 0.833374 11.4405 0.833374 7.66659Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M12.9798 12.9797C13.1751 12.7844 13.4917 12.7844 13.6869 12.9797L15.0203 14.313C15.2155 14.5083 15.2155 14.8249 15.0203 15.0201C14.825 15.2154 14.5084 15.2154 14.3132 15.0201L12.9798 13.6868C12.7846 13.4915 12.7846 13.175 12.9798 12.9797Z" fill={color}/>
    </Svg>

);

export default SearchIcon;
