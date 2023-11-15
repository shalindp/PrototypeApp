import { Text } from 'react-native';
import React from 'react';
import { TextProps } from 'react-native/Libraries/Text/Text';
import { twMerge } from 'tailwind-merge';
import { IAppComponent } from '../../utils/interfaces';
import { AppFont } from '../../utils/constants/styles/AppFont';

interface IAppText extends TextProps, IAppComponent {

}

export const AppText: React.FC<IAppText> = (props) => {
   return <Text {...props} style={{ fontFamily: props.frontFamily || AppFont.SatoshiMedium}}
      className={twMerge('select-none text-stone-600 text-[15px]', props.class)}>{props.children}</Text>;
};