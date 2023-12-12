import Animated, { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { IAppComponent } from '../../utils/interfaces';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/device';
import { AppColors } from '../../utils/constants/styles/AppColors';

export interface IFadeInOutRefProps {
   transition: (cb: ()=>void, duration?: number) => void;
   transitionIn: () => void;
}

interface IFadeInOutProps extends IAppComponent {
}

const DURATION = 500;
// eslint-disable-next-line react/display-name
const AppPageTransition = forwardRef<IFadeInOutRefProps, IFadeInOutProps>((props, ref) => {
   const opacityDelta = useSharedValue<number>(1);

   useEffect(() => {
      transitionMount();
   }, []);

   const transition = (cb: ()=>void, duration?:number) => {
      const wrapper = ()=>{
         cb();
         transitionMount();
      };

      opacityDelta.value = withTiming(1, {duration: duration || DURATION}, () => runOnJS(wrapper)());
   };

   const transitionMount = () => {
      opacityDelta.value = withTiming(0, {duration: DURATION});
   };

   useImperativeHandle(ref, () => ({ transition, transitionIn: transitionMount }), []);

   return <Animated.View
      className={props.class}
      style={[
         { position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH, zIndex: 10, pointerEvents: 'none', backgroundColor: AppColors.stone[100]},
         { opacity: opacityDelta }]} />;
});
export default AppPageTransition;
