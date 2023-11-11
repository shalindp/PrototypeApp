import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { Ref, forwardRef } from 'react';
import { IAnimatedSvg } from '../../utils/interfaces';
import Animated from 'react-native-reanimated';
import { AppColors } from '../../utils/constants/styles/AppColors';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SvgLockIcon = (props: IAnimatedSvg, ref: Ref<SVGSVGElement>) => (
   <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      fill="none"
      viewBox="0 0 20 20"
      //@ts-ignore
      ref={ref}
      {...props}>
      <AnimatedPath
         animatedProps={props.animatedprops}
         d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-1-7.208a2.5 2.5 0 1 1 2 0V14H9v-3.208Z"
      />
   </Svg>
);
const ForwardRef = forwardRef(SvgLockIcon);
export default ForwardRef;
