import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { Ref, forwardRef } from 'react';

const SvgAppleIcon = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
         fill='#0B0B0A'
         fillRule='evenodd'
         d='M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12Z'
         clipRule='evenodd'
      />
      <Path
         fill='#fff'
         fillRule='evenodd'
         d='M14.058 5.598c.522-.674.918-1.626.775-2.598-.853.06-1.85.605-2.432 1.316-.53.645-.966 1.603-.796 2.534.933.029 1.895-.53 2.453-1.252Zm4.609 9.141c-.373.832-.553 1.203-1.034 1.94-.67 1.028-1.616 2.309-2.788 2.318-1.041.011-1.31-.682-2.723-.674-1.412.008-1.707.687-2.75.677-1.172-.01-2.067-1.166-2.738-2.194-1.876-2.873-2.073-6.246-.916-8.04.823-1.274 2.12-2.019 3.34-2.019 1.24 0 2.022.685 3.05.685.996 0 1.603-.687 3.039-.687 1.086 0 2.238.596 3.057 1.623-2.686 1.48-2.251 5.339.463 6.371Z'
         clipRule='evenodd'
      />
   </Svg>
);
const ForwardRef = forwardRef(SvgAppleIcon);
export default ForwardRef;
