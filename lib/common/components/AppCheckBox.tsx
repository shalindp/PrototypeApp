import { IAppComponent } from '../../utils/interfaces';
import { TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { AppText } from './AppText';
import { twMerge } from 'tailwind-merge';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { AppColors } from '../../utils/constants/styles/AppColors';

interface IAppCheckBox extends IAppComponent {
  label: string;
  onChange: (isChecked:boolean) => void;
}

export const AppCheckBox: React.FC<IAppCheckBox> = (props) => {
   const isActive = useRef<boolean>(false);
   const activeColorDelta = useSharedValue<string>(AppColors.stone[100]);

   const handleState = () => {
      if (isActive.current) {
         activeColorDelta.value = withTiming(AppColors.stone[100]);
         isActive.current = false;
         props.onChange(false);
      } else {
         activeColorDelta.value = withTiming(AppColors.main[500]);
         isActive.current = true;
         props.onChange(true);
      }
   };

   return <TouchableOpacity
      className={twMerge('h-12 p-4 flex flex-row w-fit justify-center items-center rounded-full', props.class)}
      onPress={handleState}>
      <View className='w-6 h-6 rounded-full border-2 border-stone-350 flex items-center justify-center mr-2'>
         <Animated.View className='w-4 h-4 rounded-full'
            //@ts-ignore
            style={{ backgroundColor: activeColorDelta }} />
      </View>
      <AppText>{props.label}</AppText>
   </TouchableOpacity>;
};