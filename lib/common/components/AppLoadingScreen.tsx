import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { IAppComponent } from '../../utils/interfaces';
import { Logo } from '../icons';
import { AppColors } from '../../utils/constants/styles/AppColors';
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withSequence,
   withTiming
} from 'react-native-reanimated';

export const AppLoadingScreen: FC<IAppComponent> = () => {
   const opacityDelta = useSharedValue<number>(0);

   const rStyle = useAnimatedStyle(() => {
      return { opacity: opacityDelta.value };
   });

   useEffect(() => {
      opacityDelta.value = withRepeat(
         withSequence(withTiming(0, { duration: 1000 }), withTiming(1, { duration: 1000 }), withTiming(0, { duration: 1000 })), 0);
   }, []);

   return <View className='w-full h-full justify-center items-center'>
      <Animated.View style={rStyle}>
         <Logo width={42} height={42} fill={AppColors.stone[350]} />
      </Animated.View>
   </View>;
};