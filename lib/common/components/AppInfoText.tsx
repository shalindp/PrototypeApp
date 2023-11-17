import { View } from 'react-native';
import { AppText } from './AppText';
import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '../../utils/constants/styles/AppColors';
import { IAppComponent } from '../../utils/interfaces';
import { twMerge } from 'tailwind-merge';

interface IInfoText extends IAppComponent{
   text: string;
}

export const AppInfoText:FC<IInfoText> = (props) => {
   return <View className={twMerge('flex flex-row justify-self-center items-center', props.class)}>
      <Ionicons name="ios-information-circle-sharp" style={{marginRight: 4}} size={24} color={AppColors.stone[400]} />
      <AppText class='text-stone-400'>{props.text}</AppText>
   </View>;
};