import { ComponentState, IAppComponent } from '../../utils/interfaces';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppColors } from '../../utils/constants/styles/AppColors';
import { twMerge } from 'tailwind-merge';
import { AppSpinner } from './AppSpinner';
import { AppText } from './AppText';
import { AppFont } from '../../utils/constants/styles/AppFont';
import { AppFadeIn } from './AppFadeIn';
import { UseMutationOptions } from '@tanstack/react-query/src/types';
import { DefaultError } from '@tanstack/query-core';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '../../api/app/client';

export interface IAppButton extends IAppComponent {
   text: string;
   onClick: () => Promise<any>;
   foo?: ICustom<unknown, unknown, unknown, any>
}

export interface ICustom<TRequest, TSuccessResponse, TErrorResponse, TRequestParam> {
   mutateFn: (req: TRequest)=> Promise<TSuccessResponse>,
   requestValues: React.MutableRefObject<TRequestParam>,
   onError: (e: TErrorResponse) => void,
   onSuccess: (result: TSuccessResponse)=> void;
}

export const AppButton: FC<IAppButton> = (props) => {
   const [state, sState] = useState<ComponentState>(props.state);

   const mut = useMutation(props.foo?{
      mutationFn: props.foo.mutateFn,
      onSuccess: props.foo.onSuccess,
      onError: props.foo.onError
   }:{});

   const onClick = async () => {
      try {
         sState(ComponentState.Loading);
         console.log('IN BUT', props?.foo?.requestValues);
         await mut.mutateAsync(props?.foo?.requestValues.current);
         await props.onClick();
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