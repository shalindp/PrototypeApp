import { Text, TouchableOpacity, View } from 'react-native';
import { IAppComponent } from '../../utils/interfaces';
import React, { FC, ReactNode } from 'react';
import { AppleIcon, FacebookIcon, GoogleIcon } from '../icons';
import { AppText } from './AppText';

interface IThirdPartAuth extends IAppComponent {
  prefixText?: string;
  postfixText?: string;
  postfixInlineSlot?: ReactNode;
}

export const AppThirdPartyAuth: FC<IThirdPartAuth> = (props) => {
   return <View className='flex flex-col justify-center items-center w-full gap-y-8'>
      {props.prefixText && <AppText class='text-stone-500'>{props.prefixText}</AppText>}
      <View className='flex-row justify-between px-8 w-full'>
         <TouchableOpacity>
            <GoogleIcon width={28} height={28} />
         </TouchableOpacity>
         <TouchableOpacity>
            <FacebookIcon width={28} height={28}/>
         </TouchableOpacity>
         <TouchableOpacity>
            <AppleIcon width={28} height={28}/>
         </TouchableOpacity>
      </View>
      <View className='flex flex-row justify-center items-center'>
         {props.postfixText && <AppText class='text-stone-500'>{props.postfixText}</AppText>}
         {props.postfixInlineSlot}
      </View>
   </View>;
};