import { TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../utils/constants/styles/AppColors';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { isAndroid } from '../../utils/device';
import { AppRadii } from '../../utils/constants/styles/AppRadii';
import { Ionicons } from '@expo/vector-icons';
import { ComponentState, IAppComponent } from '../../utils/interfaces';
import React, { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const AppGenderIdentityToggle:FC<IAppComponent> = (props) => {
   const xPosDelta = useSharedValue<number>(0);
   const [state, sState] = useState<ComponentState>(ComponentState.Active);

   const onPress = () => {
      if (state === ComponentState.Default) {
         sState(ComponentState.Active);
         xPosDelta.value = withSpring(0, { damping: 12 });

      } else {
         sState(ComponentState.Default);
         xPosDelta.value = withSpring(90, { damping: 12 });
      }
   };

   return <TouchableOpacity className={twMerge('relative rounded-full', props.class)}
      onPress={onPress}
      style={{ width: 180, height: 60, borderWidth: 2, borderColor: AppColors.stone[200] }}
   >
      <Animated.View className='bg-main-500 absolute h-[56px] w-[86px] rounded-full flex justify-center items-center'
         style={[{ borderRadius: isAndroid ? AppRadii.sm: undefined }, { right: xPosDelta }]} />
      <View className='z-5 w-full h-full justify-around items-center flex flex-row'>
         <Ionicons name='ios-male-sharp' className='z-5' size={24}
            color={state === ComponentState.Active ? AppColors.main[500] : AppColors.stone[100]} />
         <Ionicons name='ios-female-sharp' className='z-5' size={24}
            color={state === ComponentState.Active ? AppColors.stone[100] : AppColors.main[500]} />
      </View>
   </TouchableOpacity>;
};