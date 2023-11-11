import React, { useCallback, useEffect } from 'react';
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DELTA_Y_MAX = -SCREEN_HEIGHT;

interface IBottomSheet extends IAppComponent {

}

export const AppBottomSheet: React.FC<IBottomSheet> = (props) => {
   const context = useSharedValue<{ y: number }>({ y: 0 });
   const yDelta = useSharedValue<number>(0);

   const snapTo = useCallback((target: number) => {
      'worklet';
      yDelta.value = withSpring(target, { damping: 50 });
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

   useEffect(() => {
      yDelta.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 });
   });

   const animStyles = useAnimatedStyle<ViewStyle>(() => {

      const radius = interpolate(yDelta.value, [DELTA_Y_MAX + 50, DELTA_Y_MAX], [AppRadii.sm, AppRadii.xsm], Extrapolation.CLAMP);

      return {
         transform: [{ translateY: yDelta.value }],
         borderStartStartRadius: radius,
         borderStartEndRadius: radius
      };
   });

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
            className='bg-stone-400 w-20 h-1 my-5 rounded-full self-center'
         />
      </Animated.View>
   </GestureDetector>;
};

