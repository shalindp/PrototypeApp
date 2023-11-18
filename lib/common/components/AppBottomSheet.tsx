import React, { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';
import { AppRadii } from '../../utils/constants/styles/AppRadii';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
   Extrapolation,
   interpolate,
   useAnimatedStyle,
   useSharedValue,
   withSpring
} from 'react-native-reanimated';
import { IAppComponent } from '../../utils/interfaces';
import { AppText } from './AppText';
import { areObjectEqual } from '../../utils/functions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DELTA_Y_MAX = -SCREEN_HEIGHT;

interface IBottomSheet extends IAppComponent {

}

export interface IBottomSheetRefProps {
   open: ()=>void;
   setContent: (content: ReactNode)=>void;
}

// eslint-disable-next-line react/display-name
const AppBottomSheet  = forwardRef<IBottomSheetRefProps, IBottomSheet>((props, ref) => {
   const context = useSharedValue<{ y: number }>({ y: 0 });
   const yDelta = useSharedValue<number>(0);
   const isOpen = useSharedValue<boolean>(false);

   const [content, sContent] = useState<ReactNode>(null);

   const snapTo = useCallback((target: number) => {
      'worklet';
      yDelta.value = withSpring(target, { damping: 50 });
      isOpen.value = target !== 0;
   }, []);

   const gesture = Gesture.Pan()
      .onStart(() => {
         context.value = { y: yDelta.value };
      })
      .onUpdate((e) => {
         yDelta.value = e.translationY + context.value.y;
         yDelta.value = Math.max(yDelta.value, DELTA_Y_MAX);
      }).onEnd((e) => {
         //close
         if (yDelta.value > -SCREEN_HEIGHT / 3) {
            snapTo(0);
         } else if (yDelta.value < -SCREEN_HEIGHT / 1.5) {
            snapTo(DELTA_Y_MAX);
         }
      });

   const open = ()=>{
      if(isOpen.value){
         snapTo(0);
      }else {
         snapTo(-200);
      }
   };

   const setContent = (content:ReactNode)=>{
      sContent(content);
   };

   useImperativeHandle(ref, () => ({ open, setContent }), []);


   const animStyles = useAnimatedStyle<ViewStyle>(() => {

      const radius = interpolate(yDelta.value, [DELTA_Y_MAX + 50, DELTA_Y_MAX], [AppRadii.sm, AppRadii.xsm], Extrapolation.CLAMP);

      return {
         transform: [{ translateY: yDelta.value }],
         borderStartStartRadius: radius,
         borderStartEndRadius: radius
      };
   });

   console.log('@> rerender');

   return <GestureDetector gesture={gesture}>
      <Animated.View
         className='bg-stone-200'
         style={[{
            height: SCREEN_HEIGHT,
            width: '100%',
            position: 'absolute',
            top: SCREEN_HEIGHT
         }, animStyles]}>
         <View
            className='bg-stone-500 w-20 h-1 my-5 rounded-full self-center'
         />
         {content}
      </Animated.View>
   </GestureDetector>;
});

export default AppBottomSheet;

