import { Stack } from 'expo-router';
import { SCREEN_HEIGHT } from '../../lib/utils/device';
import React from 'react';
import { AppRoute } from '../../lib/utils/constants/nav/routes';

function _Layout() {
   // const router = useRouter();
   // const {userRef, pageTransitionRef} = useGlobalContext();
   //
   // if(!userRef.current){
   //    // pageTransitionRef.current?.transition(()=>router.push(AppRoute.SignIn));
   // }

   return (
      <Stack screenOptions={{
         animation: 'none',
         headerShown: false,
         header: ()=>null, contentStyle: {backgroundColor: 'white', height: SCREEN_HEIGHT}}}>
         <Stack.Screen options={{
         }} name={AppRoute.OnBoarding}/>
      </Stack>
   );
}

export default _Layout;