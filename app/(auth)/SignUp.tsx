import React, { useRef } from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../lib/common/contexts/GlobalContext';
import { EmailIcon, LockIcon, Logo } from '../../lib/common/icons';
import { AppText } from '../../lib/common/components/AppText';
import { AppFont } from '../../lib/utils/constants/styles/AppFont';
import { AppThirdPartyAuth } from '../../lib/common/components/AppThirdPartyAuth';
import { useRouter } from 'expo-router';
import { AppRoute } from '../../lib/utils/constants/nav/routes';
import { AppInteractiveLabel } from '../../lib/common/components/AppInteractiveLabel';
import { AppInputField } from '../../lib/common/components/AppInputField';
import { AppCheckBox } from '../../lib/common/components/AppCheckBox';
import { AppButton } from '../../lib/common/components/AppButton';
import { AuthenticationResponse, BadRequestResponse, ISignUpRequest, SignUpRequest } from '../../lib/api/app/client';
import { IMutate } from '../../lib/api/app';
import { AuthSchema } from '../../lib/utils/validations/auth';
import { AppTextError, IAppTextErrorRef } from '../../lib/common/components/AppTextError';

interface ISignUp {

}

const SignUp: React.FC = () => {
   const {
      userRef,
      colorSchemeState: [colorScheme, sColorScheme],
      pageTransitionRef,
      appApClient
   } = useGlobalContext();

   const router = useRouter();

   const formRef = useRef<ISignUpRequest>({ email: '', password: '' });
   const isSchemaValidRef = useRef<boolean>(false);
   const errorRef = useRef<IAppTextErrorRef>(null);

   const signUpMutation: IMutate<SignUpRequest, ISignUpRequest, AuthenticationResponse, BadRequestResponse> = {
      mutateFn: (c) => appApClient.signUp(c),
      requestValuesRef: formRef,
      onError: (e) => errorRef.current?.setError(e.validationResult?.errorMessage),
      onSuccess: (c) => {
         errorRef.current?.setError('');
         userRef.current = c;
         pageTransitionRef.current?.transition(() => router.push(AppRoute.OnBoarding));
      },
      isValidRef: isSchemaValidRef
   };

   const onSignUpAsync = async () => {
      const validateForm = AuthSchema.safeParse(formRef.current);

      if (!validateForm.success) {
         return;
      }

      isSchemaValidRef.current = true;
   };

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
               keyboardType='email-address'
               class='mb-8'
               onChangeText={(c) => formRef.current.email = c} />
            <AppInputField prefix={LockIcon}
               class='mb-8'
               placeholder='password'
               onChangeText={(c) => formRef.current.password = c}
               secureTextEntry={true}
               postfix={
                  <AppInteractiveLabel
                     onPress={() => {
                     }}>
                     {'Forgot?'}
                  </AppInteractiveLabel>
               }
            />
            <AppCheckBox label='Agree to terms & conditions' class='self-end mb-2' onChange={() => {
            }} />
            <AppTextError text='' class='self-center mb-8' ref={errorRef} />
            <AppButton
               mutate={signUpMutation}
               class='mb-16'
               text='Join'
               onClick={onSignUpAsync}
            />
            <View className=''>
               <AppThirdPartyAuth prefixText='Or, Join with...' postfixText='Already have an account? '
                  postfixInlineSlot={<AppInteractiveLabel onPress={() => {
                     pageTransitionRef.current?.transition(() => router.push(AppRoute.SignIn));
                  }}>{'Sign in.'}</AppInteractiveLabel>} />
            </View>
         </View>
      </View>);
};

export default SignUp;