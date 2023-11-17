import React, {FC, useEffect} from 'react';
import { IAppComponent } from '../../utils/interfaces';
import Animated, {useSharedValue, withRepeat, withTiming, Easing} from 'react-native-reanimated';
import {AppFadeIn} from './AppFadeIn';

export const AppSpinner: FC<IAppComponent> = (props) => {
   const spinDelta = useSharedValue('0deg');

   useEffect(()=>{
      spinDelta.value = withRepeat(withTiming('360deg', {duration:600, easing: Easing.linear}), 0);
   },[]);

   return (
      <AppFadeIn duration={5000}>
         <Animated.View className="w-8 h-8 bg-red-500 border-4 border-stone-350 border-t-slate-50 bg-transparent rounded-[20px]"
            style={{
               transform: [{rotateZ: spinDelta}]
            }}/>
      </AppFadeIn>
   );
};

