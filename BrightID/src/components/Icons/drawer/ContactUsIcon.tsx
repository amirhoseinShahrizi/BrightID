import { GRAY9 } from '@/theme/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color?: string;
  highlight?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

const ContactUsIcon = ({
  color = GRAY9,
  width = 20,
  height = 20,
}: Props) => (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.65836 5.5C5.45348 5.5 5.26751 5.50796 5.09538 5.52948C5.08892 5.53029 5.08244 5.53097 5.07596 5.53152C4.04607 5.61958 3.34331 5.95981 2.89034 6.49262C2.4319 7.03186 2.16669 7.84165 2.16669 8.99167V12.325C2.16669 13.9487 2.49585 14.7588 2.99452 15.1942C3.51001 15.6443 4.3374 15.8167 5.65836 15.8167H5.99169C6.18516 15.8167 6.36967 15.8787 6.51201 15.9506C6.65466 16.0227 6.80963 16.1324 6.92219 16.2796L6.92503 16.2833L7.9257 17.6176C8.0672 17.8071 8.2168 17.8604 8.32503 17.8604C8.43326 17.8604 8.58285 17.8071 8.72435 17.6176L8.72503 17.6167L9.72501 16.2833C9.94444 15.9908 10.2926 15.8167 10.6584 15.8167H10.9917C12.1425 15.8167 12.9522 15.5531 13.4911 15.0958C14.0233 14.6442 14.3637 13.9419 14.4518 12.9076C14.4524 12.901 14.4531 12.8945 14.4539 12.888C14.4754 12.7159 14.4834 12.5299 14.4834 12.325V8.99167C14.4834 7.73998 14.1698 6.8915 13.6308 6.35252C13.0919 5.81353 12.2434 5.5 10.9917 5.5H5.65836ZM4.98117 4.53599C5.20584 4.50847 5.4332 4.5 5.65836 4.5H10.9917C12.3983 4.5 13.5457 4.85314 14.338 5.64541C15.1302 6.43768 15.4834 7.58504 15.4834 8.99167V12.325C15.4834 12.5502 15.4749 12.7775 15.4474 13.0021C15.3424 14.2133 14.9246 15.1909 14.1381 15.8583C13.3562 16.5218 12.2825 16.8167 10.9917 16.8167H10.6584C10.6074 16.8167 10.5556 16.8426 10.525 16.8833L9.52571 18.2158C9.52566 18.2158 9.52576 18.2157 9.52571 18.2158C9.22556 18.6177 8.79589 18.8604 8.32503 18.8604C7.85419 18.8604 7.4247 18.618 7.12456 18.216C7.12448 18.216 7.12463 18.2161 7.12456 18.216L6.1293 16.8891C6.12786 16.8876 6.12344 16.8833 6.11513 16.8768C6.10136 16.8661 6.0827 16.8541 6.06094 16.8431C6.03914 16.8321 6.01897 16.8245 6.00324 16.8201C5.9949 16.8178 5.98979 16.8169 5.98786 16.8167H5.65836C4.32099 16.8167 3.15254 16.6598 2.33677 15.9475C1.5042 15.2204 1.16669 14.0347 1.16669 12.325V8.99167C1.16669 7.70003 1.46398 6.62649 2.12846 5.8449C2.79664 5.05895 3.77381 4.64098 4.98117 4.53599Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.61347 4.50007C5.62845 4.5 5.64343 4.49996 5.65839 4.49996H10.9917C12.3984 4.49996 13.5457 4.8531 14.338 5.64537C15.1302 6.43764 15.4834 7.585 15.4834 8.99163V12.325C15.4834 12.34 15.4834 12.3551 15.4833 12.3701C16.2074 12.2216 16.7306 11.9195 17.0933 11.4935C17.5513 10.9556 17.8167 10.1462 17.8167 8.99163V5.6583C17.8167 4.4066 17.5032 3.55813 16.9642 3.01914C16.4252 2.48016 15.5767 2.16663 14.3251 2.16663H8.99172C7.8417 2.16663 7.0319 2.43184 6.49266 2.89028C6.06573 3.25324 5.76245 3.77657 5.61347 4.50007ZM5.84495 2.1284C6.62654 1.46392 7.70008 1.16663 8.99172 1.16663H14.3251C15.7317 1.16663 16.879 1.51977 17.6713 2.31203C18.4636 3.1043 18.8167 4.25166 18.8167 5.6583V8.99163C18.8167 10.2871 18.5196 11.361 17.8547 12.1418C17.1844 12.929 16.2036 13.3446 14.9926 13.4481C14.8423 13.461 14.6942 13.4053 14.5897 13.2965C14.4851 13.1878 14.4352 13.0377 14.4539 12.8879C14.4754 12.7158 14.4834 12.5298 14.4834 12.325V8.99163C14.4834 7.73994 14.1699 6.89146 13.6309 6.35247C13.0919 5.81349 12.2434 5.49996 10.9917 5.49996H5.65839C5.45351 5.49996 5.26754 5.50792 5.09541 5.52944C4.9457 5.54815 4.79555 5.49827 4.68681 5.39369C4.57806 5.28911 4.52235 5.14103 4.53521 4.9907C4.63882 3.77893 5.05692 2.79835 5.84495 2.1284Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.7463 11.0416C10.7463 10.7655 10.9701 10.5416 11.2463 10.5416H11.2538C11.5299 10.5416 11.7538 10.7655 11.7538 11.0416C11.7538 11.3178 11.5299 11.5416 11.2538 11.5416H11.2463C10.9701 11.5416 10.7463 11.3178 10.7463 11.0416Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.82959 11.0416C7.82959 10.7655 8.05345 10.5416 8.32959 10.5416H8.33709C8.61323 10.5416 8.83709 10.7655 8.83709 11.0416C8.83709 11.3178 8.61323 11.5416 8.33709 11.5416H8.32959C8.05345 11.5416 7.82959 11.3178 7.82959 11.0416Z" fill={color}/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M4.9129 11.0416C4.9129 10.7655 5.13676 10.5416 5.4129 10.5416H5.4204C5.69655 10.5416 5.9204 10.7655 5.9204 11.0416C5.9204 11.3178 5.69655 11.5416 5.4204 11.5416H5.4129C5.13676 11.5416 4.9129 11.3178 4.9129 11.0416Z" fill={color}/>
    </Svg>

);

export default ContactUsIcon;
