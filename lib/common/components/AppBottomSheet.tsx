import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { AppRadii } from '../../utils/constants/styles/AppRadii';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
   Extrapolation,
   interpolate,
   useAnimatedProps,
   useAnimatedStyle,
   useSharedValue,
   withSpring,
   withTiming
} from 'react-native-reanimated';
import { IAppComponent } from '../../utils/interfaces';
import { AppColors } from '../../utils/constants/styles/AppColors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DELTA_Y_MAX = -SCREEN_HEIGHT + 90;

interface IBottomSheet extends IAppComponent {

}

export interface IBottomSheetRefProps {
   open: (snapPoint?: number) => void;
   setContent: (content: ReactNode) => void;
}

// eslint-disable-next-line react/display-name
const AppBottomSheet = forwardRef<IBottomSheetRefProps, IBottomSheet>((props, ref) => {
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
         if (yDelta.value > -SCREEN_HEIGHT / 3) {
            //close
            snapTo(0);
         } else if (yDelta.value < -SCREEN_HEIGHT / 1.5) {
            snapTo(DELTA_Y_MAX);
         } else {
            snapTo(-SCREEN_HEIGHT / 2);
         }
      });

   const open = (snapPoint?: number) => {
      if (isOpen.value) {
         snapTo(0);
      } else {
         if(snapPoint === 1){
            snapTo(-SCREEN_HEIGHT / 2);
         }else if(snapPoint === 2){
            snapTo(DELTA_Y_MAX);
         }
         else{
            snapTo(-SCREEN_HEIGHT / 3);
         }

      }
   };

   const setContent = (content: ReactNode) => {
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

   const rBackdropStyle = useAnimatedStyle(() => {
      return {
         opacity: withTiming(isOpen.value ? 1 : 0)
      };
   }, []);

   const rContentContainerStyle = useAnimatedStyle(()=>{
      return { height: Math.abs(yDelta.value) - 95 };
   },[]);

   const rBackdropProps = useAnimatedProps<Partial<Animated.AnimateProps<ViewProps>>>(() => {
      return {
         pointerEvents: isOpen.value ? 'auto' : 'none'
      };
   }, []);

   return <>
      <Animated.View
         style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.4)' }, rBackdropStyle]}
         animatedProps={rBackdropProps}
         onTouchStart={()=>{snapTo(0);}}
      />
      <GestureDetector gesture={gesture}>
         <Animated.View
            style={[{
               height: SCREEN_HEIGHT,
               width: '100%',
               position: 'absolute',
               top: SCREEN_HEIGHT,
               backgroundColor: AppColors.stone[150],
            }, animStyles]}>
            <View
               className='bg-stone-500 w-20 h-1 my-5 rounded-full self-center'
            />
            <Animated.View style={rContentContainerStyle}>
               {content}
            </Animated.View>
         </Animated.View>
      </GestureDetector>
   </>;
});

export default AppBottomSheet;

