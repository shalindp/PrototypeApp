import {ComponentState, IAppComponent} from '../../utils/interfaces';
import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AppColors} from '../../utils/constants/styles/AppColors';
import {twMerge} from 'tailwind-merge';
import {Spinner} from './Spinner';
import {AppText} from './AppText';
import {AppFont} from '../../utils/constants/styles/AppFont';
import {FadeIn} from './FadeIn';

export interface IAppButton extends IAppComponent {
    text: string;
    onClick: () => Promise<any>;
}

export const AppButton: FC<IAppButton> = (props) => {
   const [state, sState] = useState<ComponentState>(props.state);

   const onClick = async () => {
      sState(ComponentState.Loading);
      await props.onClick();
      sState(ComponentState.Default);
   };

   return <TouchableOpacity
      disabled={state === ComponentState.Disabled || state === ComponentState.Loading}
      className={twMerge('flex justify-center items-center w-50 h-14 rounded-full bg-main-500', props.class)}
      style={{
         shadowColor: AppColors.stone[800],
         shadowOpacity: .15,
         shadowRadius: 4,
         elevation: 5
      }}
      onPress={onClick}
   >
      {state === ComponentState.Loading && <Spinner/>}
      {state !== ComponentState.Loading &&
            <FadeIn duration={5000}>
               <AppText class='text-stone-200 text-lg' frontFamily={AppFont.SatoshiMedium}>{props.text}</AppText>
            </FadeIn>
      }
   </TouchableOpacity>;
};