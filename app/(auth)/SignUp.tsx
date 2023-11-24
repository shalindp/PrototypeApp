import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { AppColorScheme, useGlobalContext } from '../../lib/common/contexts/GlobalContext';
import { SCREEN_HEIGHT } from '../../lib/utils/device';
import { EmailIcon, LockIcon, Logo } from '../../lib/common/icons';
import { AppText } from '../../lib/common/components/AppText';
import { AppFont } from '../../lib/utils/constants/styles/AppFont';
import { delay } from '../../lib/utils/functions';
import { AppThirdPartyAuth } from '../../lib/common/components/AppThirdPartyAuth';
import { useRouter } from 'expo-router';
import { AppRoute } from '../../lib/utils/constants/nav/routes';
import { AppFadeIn } from '../../lib/common/components/AppFadeIn';
import { AppInteractiveLabel } from '../../lib/common/components/AppInteractiveLabel';
import { AppInputField } from '../../lib/common/components/AppInputField';
import { AppCheckBox } from '../../lib/common/components/AppCheckBox';
import { AppButton } from '../../lib/common/components/AppButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Client, ISignUpRequest, SignInRequest, SignUpRequest } from '../../lib/api/app/client';

interface ISignUp {

}

const SignUp: React.FC = () => {
   const { colorScheme: [cs, sCs], pageTransition, appApClient } = useGlobalContext();
   const router = useRouter();

   const form = useRef<ISignUpRequest>({ email: null, password: null });

   const  mutation = useMutation({
      mutationFn:  (request:SignUpRequest) => appApClient.signUp(request),
      onError: (e)=>console.log('@>',e),
      onSuccess: (e)=>console.log('@> resp',e)
   });


   return (
      <View
         className='dark w-full flex flex-col justify-start items-center h-full px-3 py-10 self-center'
         style={{ maxWidth: 450 }}
      >
         <View className='mb-16'>
            <Logo width={42} height={42} />
         </View>
         <View className='self-start flex flex-col gap-y-2 mb-16'>
            <AppText frontFamily={AppFont.SatoshiMedium} class='text-3xl mb-2'>{'Join'}</AppText>
            <AppText class='text-stone-500 text-[16px]'>{'Discover timeless connections.'}</AppText>
         </View>
         <View className='flex flex-col w-full'>
            <AppInputField
               prefix={EmailIcon}
               placeholder='email'
               class='mb-8'
               onChangeText={(c) => form.current.email = c} />
            <AppInputField prefix={LockIcon}
               class='mb-8'
               placeholder='password'
               onChangeText={(c) => form.current.password = c}
               postfix={
                  <AppInteractiveLabel
                     onPress={() => {
                     }}>
                     {'Forgot?'}
                  </AppInteractiveLabel>
               }
            />
            <AppCheckBox label='Agree to terms & conditions' class='self-end mb-8' onChange={() => {
            }} />
            <AppButton class='mb-16' text='Join' onClick={async () => {
               console.log('@>', form.current);
               // await fetchData();
               mutation.mutate(new SignUpRequest({email: form.current.email, password: form.current.password}));
            }} />
            <View className=''>
               <AppThirdPartyAuth prefixText='Or, Join with...' postfixText='Already have an account? '
                  postfixInlineSlot={<AppInteractiveLabel onPress={() => {
                     pageTransition.current.transition(() => router.push(AppRoute.SignIn));
                  }}>{'Sign in.'}</AppInteractiveLabel>} />
            </View>
         </View>
      </View>);
};

export default SignUp;