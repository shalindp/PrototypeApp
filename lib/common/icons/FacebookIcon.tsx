import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { Ref, forwardRef } from 'react';

const SvgFacebookIcon = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
   <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      viewBox='0 0 24 24'
      //@ts-ignore
      ref={ref}
      {...props}>
      <Path
         fill='#1877F2'
         d='M24 11.853a12 12 0 1 0-13.876 12v-8.505h-3v-3.495h3V9.198a4.243 4.243 0 0 1 4.5-4.71c.9.012 1.798.092 2.686.24v3h-1.5a1.74 1.74 0 0 0-1.95 1.89v2.265h3.33l-.54 3.495h-2.775v8.4A12 12 0 0 0 24 11.853Z'
      />
   </Svg>
);
const ForwardRef = forwardRef(SvgFacebookIcon);
export default ForwardRef;
