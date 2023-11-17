import Animated, { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { FC, forwardRef, PropsWithChildren, ReactNode, Ref, useEffect, useImperativeHandle } from 'react';
import React from 'react';
import { IAppComponent } from '../../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/device';
import { AppColors } from '../../utils/constants/styles/AppColors';

export interface IFadeInOutRefProps {
   transition: (cb: ()=>void) => void;
}

interface IFadeInOutProps extends IAppComponent {
}

const DURATION = 650;
// eslint-disable-next-line react/display-name
const AppPageTransition = forwardRef<IFadeInOutRefProps, IFadeInOutProps>((props, ref) => {
   const opacityDelta = useSharedValue<number>(1);

   useEffect(() => {
      transitionMount();
   }, []);

   const transition = (cb: ()=>void) => {
      const wrapper = ()=>{
         cb();
         transitionMount();
      };
      opacityDelta.value = withTiming(1, {duration: DURATION}, () => runOnJS(wrapper)());

   };

   const transitionMount = () => {
      opacityDelta.value = withTiming(0, {duration: DURATION});
   };

   useImperativeHandle(ref, () => ({ transition }), []);

   return <Animated.View
      className={props.class}
      style={[
         { position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, zIndex: 10, pointerEvents: 'none', backgroundColor: AppColors.stone[100]},
         { opacity: opacityDelta }]} />;
});
export default AppPageTransition;
