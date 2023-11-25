import { ComponentState, IAppComponent } from '../../utils/interfaces';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppColors } from '../../utils/constants/styles/AppColors';
import { twMerge } from 'tailwind-merge';
import { AppSpinner } from './AppSpinner';
import { AppText } from './AppText';
import { AppFont } from '../../utils/constants/styles/AppFont';
import { AppFadeIn } from './AppFadeIn';
import { useMutation } from '@tanstack/react-query';
import { IMutate } from '../../api/app';

export interface IAppButton extends IAppComponent {
   text: string;
   onClick: () => Promise<any>;
   mutate?: IMutate<any, any, any, any>;
}

export const AppButton: FC<IAppButton> = (props) => {
   const [state, sState] = useState<ComponentState>(props.state || ComponentState.Default);

   const { mutateAsync } = useMutation(props.mutate ? {
      mutationFn: props.mutate.mutateFn,
      onSuccess: props.mutate.onSuccess,
      onError: props.mutate.onError
   } : {});

   const onClick = async () => {
      try {
         sState(ComponentState.Loading);
         await props.onClick();
         if (props.mutate && props.mutate.isValidRef.current) {
            await mutateAsync(props.mutate.requestValuesRef.current);
         }
      } catch { /* empty */
      } finally {
         sState(ComponentState.Default);
      }

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
      {state === ComponentState.Loading && <AppSpinner />}
      {state !== ComponentState.Loading &&
         <AppFadeIn duration={5000}>
            <AppText class='text-stone-200 text-lg' frontFamily={AppFont.SatoshiMedium}>{props.text}</AppText>
         </AppFadeIn>
      }
   </TouchableOpacity>;
};