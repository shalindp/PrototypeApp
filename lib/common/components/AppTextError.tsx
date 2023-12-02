import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { twMerge } from 'tailwind-merge';
import { IAppComponent } from '../../utils/interfaces';
import { AppFont } from '../../utils/constants/styles/AppFont';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

interface IAppTextError extends TextProps, IAppComponent {
   text: string;
}

export interface IAppTextErrorRef {
   setError: (text?: string) => void;
}

// eslint-disable-next-line react/display-name
export const AppTextError = forwardRef<IAppTextErrorRef, IAppTextError>((props, ref) => {
   const posDelta = useSharedValue<number>(0);
   const [state, sState] = useState<string | undefined>(props.text);

   const animate = useCallback(() => {
      posDelta.value =
         withSequence(
            withTiming(-3, { duration: 50, easing: Easing.linear }),
            withTiming(0, { duration: 50, easing: Easing.linear }),
            withTiming(3, { duration: 50, easing: Easing.linear }),
            withTiming(0, { duration: 50, easing: Easing.linear })
         );
   }, []);

   const rStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateX: posDelta.value }]
      };
   }, []);


   const setError = useCallback(
      (text?: string) => {
         sState(text);
         animate();
      },
      [state]
   );

   useImperativeHandle(ref, () => ({ setError }), []);

   return <Animated.Text {...props} style={[{ fontFamily: props.frontFamily || AppFont.SatoshiMedium }, rStyle]}
      className={twMerge('select-none text-[15px]', state? 'text-red-400': 'text-transparent', props.class)}>{state||'default'}</Animated.Text>;
});
