import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { GenderIdentity } from '../../lib/on-boarding/GenderIdentity';
import { Age } from '../../lib/on-boarding/Age';
import { Interests } from '../../lib/on-boarding/Interests';
import { isWeb, SCREEN_WIDTH } from '../../lib/utils/device';
import { AppRoundedButton } from '../../lib/common/components/AppRoundedButton';
import { AppPaginationIndicator } from '../../lib/common/components/AppPaginationIndicator';
import Animated, {
   useAnimatedRef,
   useAnimatedScrollHandler,
   useDerivedValue,
   useSharedValue
} from 'react-native-reanimated';

const Pages = [
   '1',
   '2',
   '3'
];
const OnBoarding = () => {
   const translateXDelta = useSharedValue<number>(0);
   const scrollRef = useAnimatedRef<Animated.ScrollView>();

   const scrollHandler = useAnimatedScrollHandler((c) => {
      translateXDelta.value = c.contentOffset.x;
      console.log('@>', c.contentOffset.x);
   });

   const activeIndex = useDerivedValue(() => {
      return Math.round(translateXDelta.value / SCREEN_WIDTH);
   });

   const onScroll = useCallback(() => {
      if (activeIndex.value === Pages.length - 1) {
         return;
      }
      scrollRef.current.scrollTo({ x: SCREEN_WIDTH * (activeIndex.value + 1) });
   }, []);

   return <View className='h-full flex flex-col'>
      <Animated.ScrollView
         className='h-full'
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         onScroll={scrollHandler}
         ref={scrollRef}
         scrollEventThrottle={16}
      >
         <GenderIdentity />
         <Age />
         <Interests />
      </Animated.ScrollView>
      <AppPaginationIndicator count={Pages.length} translateXDelta={translateXDelta} />
      <AppRoundedButton
         icon='arrow-forward-circle'
         class='self-end mr-10 mb-10'
         onPress={onScroll} />
   </View>;
};

export default OnBoarding;