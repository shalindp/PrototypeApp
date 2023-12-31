import React, { useRef } from 'react';
import { useFonts } from 'expo-font';
import '../global.css';
import { Stack, Tabs } from 'expo-router';
import { GlobalContextProvider } from '../lib/common/contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH } from '../lib/utils/device';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import AppPageTransition, { IFadeInOutRefProps } from '../lib/common/components/AppPageTransition';
import AppBottomSheet, { IBottomSheetRefProps } from '../lib/common/components/AppBottomSheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Ensure we import the CSS for Tailwind so it's included in hot module reloads.
//@ts-ignore
const ctx = require.context(
   // If this require.context is not inside the root directory (next to the package.json) then adjust this file path
   // to resolve correctly.
   '../node_modules/.cache/expo/tailwind'
);
if (ctx.keys().length) ctx(ctx.keys()[0]);
export default function AppEntry() {
   const [fontsLoaded, fontError] = useFonts({
      'Satoshi-Black': require('../assets/fonts/Satoshi-Black.ttf'),
      'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.ttf'),
      'Satoshi-Light': require('../assets/fonts/Satoshi-Light.ttf'),
      'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.ttf'),
      'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.ttf')
   });

   const pageTransitionRef = useRef<IFadeInOutRefProps>(null);
   const bottomSheetRef = useRef<IBottomSheetRefProps>(null);

   if (!fontsLoaded && !fontError) {
      return null;
   }

   const queryClient = new QueryClient();

   return <>
      <AppPageTransition ref={pageTransitionRef} />
      <GlobalContextProvider pageTransitionRef={pageTransitionRef} bottomSheetRef={bottomSheetRef} >
         <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView className='flex justify-center items-center'>
               <KeyboardAvoidingView
                  behavior='height'
               >
                  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                     <SafeAreaView style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, marginBottom: isAndroid ? 40: 0 }}>
                        <Stack screenOptions={{
                           headerShown: false,
                           animation: 'none',
                           header: () => null,
                           contentStyle: { backgroundColor: 'white' }
                        }}>
                           <Tabs.Screen name='(auth)' />
                        </Stack>
                     </SafeAreaView>
                  </ScrollView>
               </KeyboardAvoidingView>
               <AppBottomSheet ref={bottomSheetRef} />
            </GestureHandlerRootView>
         </QueryClientProvider>
      </GlobalContextProvider>
   </>;
}
