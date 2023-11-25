import React from 'react';
import { Stack } from 'expo-router';
import { AppRoute } from '../../lib/utils/constants/nav/routes';
import { SCREEN_HEIGHT } from '../../lib/utils/device';

const config = {
   animation: 'spring',
   config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
   },
};

function _Layout() {
   return (
      <Stack screenOptions={{
         animation: 'none',
         animationDuration: 200,
         headerShown: false,
         header: ()=>null, contentStyle: {backgroundColor: 'white', height: SCREEN_HEIGHT}}}>
         <Stack.Screen options={{
         }} name={AppRoute.SignIn}/>
         <Stack.Screen options={{
         }} name={AppRoute.SignUp}/>
      </Stack>
   );
}

export default _Layout;