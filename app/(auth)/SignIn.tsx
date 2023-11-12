import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import {AppColorScheme, useGlobalContext} from '../../lib/common/contexts/GlobalContext';
import {EmailIcon, LockIcon, Logo} from '../../lib/common/icons';
import {AppText} from '../../lib/common/components/AppText';
import {AppFont} from '../../lib/utils/constants/styles/AppFont';
import {AppInputField} from '../../lib/common/components/AppInputField';
import {AppInteractiveLabel} from '../../lib/common/components/AppInteractiveLabel';
import {AppCheckBox} from '../../lib/common/components/AppCheckBox';
import {AppButton} from '../../lib/common/components/AppButton';
import {delay} from '../../lib/utils/functions';
import {ThirdPartyAuth} from '../../lib/common/components/ThirdPartyAuth';
import {router, useNavigation, useRouter} from 'expo-router';
import {AppRoute} from '../../lib/utils/constants/nav/routes';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import PageTransition, {IFadeInOutRefProps} from '../../lib/common/components/PageTransition';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils/device';

interface ISignIn {

}

const SignIn: React.FC = () => {
   const {colorScheme: [cs, sCs], pageTransition} = useGlobalContext();

   const router = useRouter();

   return (
      <View
         className="dark w-full flex flex-col justify-start items-center h-full px-3 py-10"
      >
         <View className='mb-16'>
            <Logo width={42} height={42}/>
         </View>
         <View className='self-start flex flex-col gap-y-2 mb-16'>
            <AppText frontFamily={AppFont.SatoshiMedium} class='text-3xl mb-2'>{'Sign in'}</AppText>
            <AppText class='text-stone-500 text-md'>{'Hello there! Let\'s get in back to it'}</AppText>
         </View>
         <View className='flex flex-col w-full'>
            <AppInputField prefix={EmailIcon} placeholder='email' class='mb-8'/>
            <AppInputField prefix={LockIcon}
               class='mb-8'
               placeholder='password'
               postfix={
                  <AppInteractiveLabel
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
               <ThirdPartyAuth prefixText='Or, Join with...' postfixText='Ready to connect with new people?'
                  postfixInlineSlot={<AppInteractiveLabel class="p-2" onPress={() => {
                     pageTransition.current.transition(()=>router.push(AppRoute.SignUp));
                  }}>{'Join now.'}</AppInteractiveLabel>}/>
            </View>
         </View>
      </View>);
};

export default SignIn;