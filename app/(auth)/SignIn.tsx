import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import {AppColorScheme, useGlobalContext} from '../../lib/common/contexts/GlobalContext';
import {EmailIcon, LockIcon, Logo} from '../../lib/common/icons';
import {AppText} from '../../lib/common/components/AppText';
import {AppFont} from '../../lib/utils/constants/styles/AppFont';
import {delay} from '../../lib/utils/functions';
import {AppThirdPartyAuth} from '../../lib/common/components/AppThirdPartyAuth';
import {router, useNavigation, useRouter} from 'expo-router';
import {AppRoute} from '../../lib/utils/constants/nav/routes';
import { AppInputField } from '../../lib/common/components/AppInputField';
import { AppInteractiveLabel } from '../../lib/common/components/AppInteractiveLabel';
import { AppButton } from '../../lib/common/components/AppButton';
import { AppCheckBox } from '../../lib/common/components/AppCheckBox';
import { useQuery } from 'react-query';
const SignIn: React.FC = () => {
   const {colorScheme: [cs, sCs], pageTransition, appApClient} = useGlobalContext();

   const router = useRouter();

   return (
      <View
         className="dark w-full flex flex-col justify-start items-center h-full px-3 py-10 self-center"
         style={{maxWidth: 450}}
      >
         <View className='mb-16'>
            <Logo width={42} height={42}/>
         </View>
         <View className='self-start flex flex-col gap-y-2 mb-16'>
            <AppText frontFamily={AppFont.SatoshiMedium} class='text-3xl mb-2'>{'Sign in'}</AppText>
            <AppText class='text-stone-500 text-[16px]'>{'Hello there! Let\'s get in back to it.'}</AppText>
         </View>
         <View className='flex flex-col w-full'>
            <AppInputField prefix={EmailIcon} placeholder='email' class='mb-8'/>
            <AppInputField prefix={LockIcon}
               class='mb-8'
               placeholder='password'
               postfix={
                  <AppInteractiveLabel
                     class="h-full pt-2"
                     onPress={() => {
                     }}>
                     {'Forgot?'}
                  </AppInteractiveLabel>
               }
            />
            <AppCheckBox label='Remember me' class='self-end mb-8' onChange={() => {
            }}/>
            <AppButton class='mb-16' text="Sign in" onClick={async () => {
               await delay(1000);
            }}/>
            <View className=''>
               <AppThirdPartyAuth prefixText='Or, Join with...' postfixText='Ready to connect? '
                  postfixInlineSlot={<AppInteractiveLabel onPress={() => {
                     pageTransition.current.transition(()=>router.push(AppRoute.SignUp));
                  }}>{'Create account.'}</AppInteractiveLabel>}/>
            </View>
         </View>
      </View>);
};

export default SignIn;