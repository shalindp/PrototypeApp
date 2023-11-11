import { Text, TextBase, TouchableOpacity } from 'react-native';
import React from 'react';
import { strMerge } from '../../utils/functions';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { twMerge } from 'tailwind-merge';
import { IAppComponent } from '../../utils/interfaces';

export interface IAppInteractiveLabel extends TextProps, IAppComponent {
  onPress: () => void;
}

export const AppInteractiveLabel: React.FC<IAppInteractiveLabel> = (props) => {
   return <TouchableOpacity className={twMerge('flex justify-center items-center', props.class)} onPress={props.onPress}>
      <Text style={{ fontFamily: 'Satoshi-Bold' }} className="text-main-500">{props.children}</Text>
   </TouchableOpacity>;
};