import * as React from 'react';
import { forwardRef, Ref } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { AppColors } from '../../utils/constants/styles/AppColors';

const SvgLogo = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
   <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      viewBox='0 0 63 60'
      //@ts-ignore
      ref={ref}
      {...props}>
      <Path
         fill={props.fill|| AppColors.main[500]}
         fillRule='evenodd'
         d='M60.048 18.921c-2.313-4.639-6.345-7.932-11.354-9.274-3.934-1.055-8.044-.439-11.885 1.781-.631.365-1.25.768-1.853 1.208a18.59 18.59 0 0 1 1.157 1.22c1.02.052 2.037.212 3.042.482 5.008 1.342 9.04 4.635 11.353 9.274 2.154 4.32 2.648 9.564 1.356 14.387-1.552 5.792-4.835 11.04-9.758 15.597-2.402 2.224-5.197 4.287-8.351 6.168a77.36 77.36 0 0 0 3.238-1.396c5.825-2.67 10.755-5.854 14.653-9.463 4.922-4.557 8.205-9.805 9.757-15.597 1.293-4.823.798-10.067-1.355-14.387Zm-33.464-10.8a18.18 18.18 0 0 0-4.098-.432c-2.736.02-5.35.788-7.713 2.249-1.886-1.91-4.159-3.248-6.72-3.934a17.816 17.816 0 0 0-7.367-.419 19.109 19.109 0 0 1 2.436-1.917c4.322-2.861 9.46-3.697 14.47-2.355 3.698.99 6.793 3.337 8.992 6.807Z'
         clipRule='evenodd'
      />
   </Svg>
);
const ForwardRef = forwardRef(SvgLogo);
export default ForwardRef;
