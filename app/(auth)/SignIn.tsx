import React, { useRef } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../lib/common/contexts/GlobalContext';
import { EmailIcon, LockIcon, Logo } from '../../lib/common/icons';
import { AppText } from '../../lib/common/components/AppText';
import { AppFont } from '../../lib/utils/constants/styles/AppFont';
import { AppThirdPartyAuth } from '../../lib/common/components/AppThirdPartyAuth';
import { useRouter } from 'expo-router';
import { AppRoute } from '../../lib/utils/constants/nav/routes';
import { AppInputField } from '../../lib/common/components/AppInputField';
import { AppInteractiveLabel } from '../../lib/common/components/AppInteractiveLabel';
import { AppButton } from '../../lib/common/components/AppButton';
import { AppCheckBox } from '../../lib/common/components/AppCheckBox';
import { AppTextError, IAppTextErrorRef } from '../../lib/common/components/AppTextError';
import { AuthenticationResponse, BadRequestResponse, ISignInRequest, SignInRequest } from '../../lib/api/app/client';
import { IMutate } from '../../lib/api/app';
import { AuthSchema } from '../../lib/utils/validations/auth';
import { parseError } from '../../lib/utils/validations';

const SignIn: React.FC = () => {
   const router = useRouter();
   const {colorSchemeState: [colorScheme, sColorScheme], pageTransitionRef, appApClient, userRef} = useGlobalContext();

   const formRef = useRef<ISignInRequest>({ email: 'tom@gmail.com', password: '12345678' });
   const isSchemaValidRef = useRef<boolean>(false);
   const errorRef = useRef<IAppTextErrorRef>(null);

   const signInMutation: IMutate<SignInRequest, ISignInRequest, AuthenticationResponse, BadRequestResponse> = {
      mutateFn: (c) => appApClient.signIn(c),
      requestValuesRef: formRef,
      onError: (e) => errorRef.current?.setError(parseError(e)),
      onSuccess: (c) => {
         errorRef.current?.setError('');
         userRef.current = c;
         pageTransitionRef.current?.transition(()=>router.push(AppRoute.OnBoarding));
      },
      isValidRef: isSchemaValidRef
   };

   const onSignInAsync = async () => {
      const validateForm = AuthSchema.safeParse(formRef.current);
      errorRef.current?.setError('');

      if (!validateForm.success) {
         return;
      }

      isSchemaValidRef.current = true;
   };

   return (
      <View
         className="dark w-full flex flex-col justify-start items-center h-full px-3 py-10 self-center"
         style={{maxWidth: 450}}
      >
         <View className='mb-5'>
            <Logo width={42} height={42}/>
         </View>
         <View className='self-start flex flex-col gap-y-2 mb-16'>
            <AppText frontFamily={AppFont.SatoshiMedium} class='text-3xl mb-2'>{'Sign in'}</AppText>
            <AppText class='text-stone-500 text-[16px]'>{'Hello there! Let\'s get in back to it.'}</AppText>
         </View>
         <View className='flex flex-col w-full'>
            <AppInputField
               prefix={EmailIcon}
               keyboardType="email-address"
               placeholder='email'
               class='mb-8'
               onChangeText={(c)=>formRef.current.email=c}
            />
            <AppInputField prefix={LockIcon}
               class='mb-8'
               placeholder='password'
               secureTextEntry={true}
               onChangeText={(c)=>formRef.current.password=c}
               postfix={
                  <AppInteractiveLabel
                     class="h-full pt-2"
                     onPress={() => {
                     }}>
                     {'Forgot?'}
                  </AppInteractiveLabel>
               }
            />
            <AppCheckBox label='Remember me' class='self-end mb-2' onChange={() => {
            }}/>
            <AppTextError text='' class='self-center mb-8' ref={errorRef} />
            <AppButton
               class='mb-16'
               text="Sign in"
               mutate={signInMutation}
               onClick={onSignInAsync}
            />
            <View className=''>
               <AppThirdPartyAuth prefixText='Or, Join with...' postfixText='Ready to connect? '
                  postfixInlineSlot={<AppInteractiveLabel onPress={() => {
                     pageTransitionRef.current?.transition(()=>router.push(AppRoute.SignUp));
                  }}>{'Create account.'}</AppInteractiveLabel>}/>
            </View>
         </View>
      </View>);
};

export default SignIn;