import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { AppGenderIdentityToggle } from '../common/components/AppGenderIdentityToggle';
import { AppText } from '../common/components/AppText';
import { AppFont } from '../utils/constants/styles/AppFont';
import { AppInteractiveLabel } from '../common/components/AppInteractiveLabel';
import { useGlobalContext } from '../common/contexts/GlobalContext';
import { GenderList } from './GenderList';
import { useOnBoardingContext } from '../common/contexts/OnBoardingContext';

interface IGenderIdentity extends IAppComponent {

}

export const GenderIdentity: FC<IGenderIdentity> = (props) => {
   const { bottomSheetRef } = useGlobalContext();
   const {genderIdentities} = useOnBoardingContext();

   useEffect(() => {
      bottomSheetRef.current?.setContent(<GenderList
         items={genderIdentities} />
      );
   }, []);

   console.log('render');
   return <View className={twMerge('flex justify-center items-center -mt-16', props.class)}
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <AppText frontFamily={AppFont.SatoshiMedium} class='text-xl mb-16'>{'Who do you identity as?'}</AppText>
      {/*<AppInfoText class="mb-16" text={'You\'re welcome to change this anytime.'}/>*/}
      <AppGenderIdentityToggle class='mb-16' />
      <AppInteractiveLabel onPress={() => bottomSheetRef.current?.open(1)}>{'More choices'}</AppInteractiveLabel>
   </View>;
};