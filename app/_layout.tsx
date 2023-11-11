import React, {useEffect, useRef, useState} from 'react';
import {useFonts} from 'expo-font';
import '../global.css';
import {Stack, Tabs} from 'expo-router';
import {GlobalContextProvider} from '../lib/common/contexts/GlobalContext';
import {AppText} from '../lib/common/components/AppText';
import {twMerge} from 'tailwind-merge';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {isIos, SCREEN_HEIGHT, SCREEN_WIDTH} from '../lib/utils/device';
import {Keyboard, KeyboardAvoidingView, ScrollView, View} from 'react-native';

// Ensure we import the CSS for Tailwind so it's included in hot module reloads.
//@ts-ignore
const ctx = require.context(
   // If this require.context is not inside the root directory (next to the package.json) then adjust this file path
   // to resolve correctly.
   '../node_modules/.cache/expo/tailwind',
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

   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
   const scrollViewRef = useRef();

   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',
         () => {
            setKeyboardVisible(true); // or some other action
         }
      );
      const keyboardDidHideListener = Keyboard.addListener(
         'keyboardDidHide',
         () => {
            setKeyboardVisible(false); // or some other action
         }
      );

      return () => {
         keyboardDidHideListener.remove();
         keyboardDidShowListener.remove();
      };
   }, []);


   if (!fontsLoaded && !fontError) {
      return null;
   }



   return <GlobalContextProvider>
      <GestureHandlerRootView className="flex justify-center items-center">
         <KeyboardAvoidingView
            behavior="height"
         >
            <ScrollView>
               <View style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH, maxWidth: 450}}>
                  <Stack screenOptions={{
                     headerShown: false,
                     header: () => null,
                     contentStyle: {backgroundColor: 'white'},
                  }}>
                     <Tabs.Screen name="(auth)"/>
                  </Stack>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </GestureHandlerRootView>
   </GlobalContextProvider>;
}
