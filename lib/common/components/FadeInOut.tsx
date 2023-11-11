import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {FC, forwardRef, PropsWithChildren, ReactNode, Ref, useEffect, useImperativeHandle} from 'react';
import React from 'react';
import {IAppComponent} from '../../utils/interfaces';

export interface IFadeInOutRefProps {
    fadeOut: (duration?:number, cb?:()=>void) => void;
}

interface IFadeInOutProps extends IAppComponent{
    children: ReactNode
}

// eslint-disable-next-line react/display-name
const FadeInOut = forwardRef<IFadeInOutRefProps, IFadeInOutProps>((props, ref) => {
   const fadeDelta = useSharedValue<number>(0);

   useEffect(() => {
      fadeDelta.value = withTiming(1, {duration:300});
   }, []);

   const fadeOut = (duration?: number, cb?: ()=>void) => {
      fadeDelta.value = withTiming(0, {duration: 300||duration}, cb);
   };

   useImperativeHandle(ref, () => ({fadeOut}), []);

   return <Animated.View className={props.class} style={{opacity:fadeDelta}}>
      {props.children}
   </Animated.View>;
});
export default FadeInOut;
