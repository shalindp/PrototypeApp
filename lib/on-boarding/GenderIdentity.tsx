import React, { FC } from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { GenderIdentityToggle } from '../common/components/GenderIdentityToggle';
import { AppText } from '../common/components/AppText';
import { AppInteractiveLabel } from '../common/components/AppInteractiveLabel';
import { AppFont } from '../utils/constants/styles/AppFont';

interface IGenderIdentity extends IAppComponent {

}
export const GenderIdentity: FC<IGenderIdentity> = (props) => {
   return <View className={twMerge('flex justify-center items-center -mt-16', props.class)}
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <AppText frontFamily={AppFont.SatoshiMedium} class='text-xl mb-16'>{'Who do you identity as?'}</AppText>
      <GenderIdentityToggle class="mb-16"/>
      <AppInteractiveLabel onPress={()=>{}}>{'More choices'}</AppInteractiveLabel>
   </View>;
};