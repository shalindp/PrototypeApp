import React, { FC } from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { AppText } from '../common/components/AppText';

interface IAge extends IAppComponent{

}
export const Age:FC<IAge> = (props)=>{
   return <View className={twMerge('h-full', props.class)} style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
      <AppText>{'Age'}</AppText>
   </View>;
};