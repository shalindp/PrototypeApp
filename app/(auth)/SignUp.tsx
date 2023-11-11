import React, {useRef} from 'react';
import {View} from 'react-native';
import {AppColorScheme, useGlobalContext} from '../../lib/common/contexts/GlobalContext';
import {SCREEN_HEIGHT} from '../../lib/utils/device';
import {EmailIcon, LockIcon, Logo} from '../../lib/common/icons';
import {AppText} from '../../lib/common/components/AppText';
import {AppFont} from '../../lib/utils/constants/styles/AppFont';
import {AppInputField} from '../../lib/common/components/AppInputField';
import {AppInteractiveLabel} from '../../lib/common/components/AppInteractiveLabel';
import {AppCheckBox} from '../../lib/common/components/AppCheckBox';
import {AppButton} from '../../lib/common/components/AppButton';
import {delay} from '../../lib/utils/functions';
import {ThirdPartyAuth} from '../../lib/common/components/ThirdPartyAuth';
import {useRouter} from 'expo-router';
import {AppRoute} from '../../lib/utils/constants/nav/routes';
import {FadeIn} from '../../lib/common/components/FadeIn';
import FadeInOut, {IFadeInOutRefProps} from '../../lib/common/components/FadeInOut';

interface ISignUp {

}

const SignUp: React.FC = () => {
   const {colorScheme: [cs, sCs]} = useGlobalContext();

   const router = useRouter();

   const fadeInOutRef = useRef<IFadeInOutRefProps>(null);

   return (
      <FadeInOut
         class="dark w-full flex flex-col justify-start items-center h-full px-3 py-10"
         ref={fadeInOutRef}
      >
         <View className='mb-16'>
            <Logo width={42} height={42}/>
         </View>
         <View className='self-start flex flex-col gap-y-2 mb-16'>
            <AppText frontFamily={AppFont.SatoshiMedium} class='text-3xl mb-2'>{'Join'}</AppText>
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
            <AppButton class='mb-16' text="Create" onClick={async () => {
            }}/>
            <View className=''>
               <ThirdPartyAuth prefixText='Or, Join with...' postfixText='Ready to connect with new people?'
                  postfixInlineSlot={<AppInteractiveLabel class="p-2" onPress={() => {
                     fadeInOutRef.current.fadeOut();
                     router.push(AppRoute.SignIn);
                  }}>{'Sign in.'}</AppInteractiveLabel>}/>
            </View>
         </View>
      </FadeInOut>);
};

export default SignUp;