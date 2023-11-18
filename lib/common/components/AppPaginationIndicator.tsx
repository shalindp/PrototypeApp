import { View } from 'react-native';
import { IAppComponent } from '../../utils/interfaces';
import React, { FC, useCallback } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../utils/device';
import { AppColors } from '../../utils/constants/styles/AppColors';

interface IAppPaginationIndicator extends IAppComponent {
   count: number;
   translateXDelta: Animated.SharedValue<number>;
}

const Item = ({ index, translateXDelta }: { index: number, translateXDelta: Animated.SharedValue<number> }) => {

   const rStyle = useAnimatedStyle(() => {
      const width = interpolate(translateXDelta.value,
         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
         [10, 20, 10],
         'clamp'
      );

      const opacity = interpolate(translateXDelta.value,
         [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
         [.3, 1, .3],
         'clamp'
      );

      return {
         width,
         opacity
      };
   });

   return <Animated.View style={[{
      height: 10,
      borderRadius: 5,
      backgroundColor: AppColors.main[500],
      marginHorizontal: 8
   }, rStyle]} />;
};
export const AppPaginationIndicator: FC<IAppPaginationIndicator> = (props) => {

   const items = useCallback(() => {
      return Array(props.count).fill(null).map((_, i) => <Item key={i} index={i}
         translateXDelta={props.translateXDelta} />);
   }, []);

   return <View className='w-full flex flex-row justify-center items-center'>
      {items().map(c => c)}
   </View>;
};