import React, { FC } from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { AppText } from '../common/components/AppText';

interface IInterests extends IAppComponent{

}
export const Interests:FC<IInterests> = (props)=>{
   return <View className={twMerge('h-full', props.class)} style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
      <AppText>{'Interests'}</AppText>
   </View>;
};