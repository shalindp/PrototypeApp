import { Stack, useRouter } from 'expo-router';
import { SCREEN_HEIGHT } from '../../lib/utils/device';
import React from 'react';
import { AppRoute } from '../../lib/utils/constants/nav/routes';
import { useGlobalContext } from '../../lib/common/contexts/GlobalContext';
import { OnBoardingContextProvider } from '../../lib/common/contexts/OnBoardingContext';

function _Layout() {
   const router = useRouter();
   const {userRef, pageTransitionRef} = useGlobalContext();

   if(!userRef.current){
      pageTransitionRef.current?.transition(()=>router.push(AppRoute.SignIn));
   }

   return (
      <OnBoardingContextProvider>
         <Stack screenOptions={{
            animation: 'none',
            headerShown: false,
            header: ()=>null, contentStyle: {backgroundColor: 'white', height: SCREEN_HEIGHT}}}>
            <Stack.Screen options={{
            }} name={AppRoute.OnBoarding}/>
         </Stack>
      </OnBoardingContextProvider>
   );
}

export default _Layout;