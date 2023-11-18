import { IAppComponent } from '../../utils/interfaces';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '../../utils/constants/styles/AppColors';
import { twMerge } from 'tailwind-merge';

interface IAppRoundedButton extends IAppComponent {
   icon: keyof typeof Ionicons.glyphMap;
   size?: number;
   onPress: () => void;
}

export const AppRoundedButton: FC<IAppRoundedButton> = ({ size = 80, ...props }) => {
   return <TouchableOpacity
      className={twMerge(`w-[${size}px] h-[${size}px] flex justify-center items-center`, props.class)}
      onPress={props.onPress}>
      <Ionicons name={props.icon} size={size} color={AppColors.main[500]} />
   </TouchableOpacity>;
};