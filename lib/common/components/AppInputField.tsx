import React, { useRef } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../utils/constants/styles/AppColors';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { IAppComponent } from '../../utils/interfaces';
import { useIconAnimationAdapter } from '../hooks/useIconAnimationAdapter';
import { twMerge } from 'tailwind-merge';

interface IAppInputField extends Partial<TextInputProps>, IAppComponent {
  prefix?: any;
  postfix?: any;
}

export const AppInputField: React.FC<IAppInputField> = (props) => {
   const textInputRef = useRef(null);

   const deltaColor = useSharedValue<string>(AppColors.stone[350]);

   const onFocus = () => {
      deltaColor.value = withTiming(AppColors.main[500], { duration: 300 });
   };

   const onBlur = () => {
      deltaColor.value = withTiming(AppColors.stone[350], { duration: 300 });
   };

   const Prefix = props.prefix ?? null;
   const { adapter } = useIconAnimationAdapter();
   const animatedProps = useAnimatedProps(() => ({
      fill: deltaColor.value
   }), [], adapter);

   const rStyle = useAnimatedStyle(()=>{
      return {borderColor: deltaColor.value};
   });

   return (
      <TouchableOpacity className={twMerge('h-8 flex flex-col justify-between items-center', props.class)}
         // @ts-ignore
         onPress={() => textInputRef.current?.focus()}>
         <View className='h-8 flex flex-row justify-between items-center w-full gap-2'>
            {props.prefix && <Prefix animatedprops={animatedProps} />}
            <TextInput className='flex-1 h-full text-[15px]'
               placeholder={props.placeholder}
               ref={textInputRef}
               onFocus={onFocus}
               onChangeText={props.onChangeText}
               autoCapitalize="none"
               keyboardType={props.keyboardType}
               secureTextEntry={props.secureTextEntry}
               onBlur={onBlur}
               //@ts-ignore
               style={{ outlineStyle: 'none', fontFamily: 'Satoshi-Medium', color: AppColors.stone[700] }}
               placeholderTextColor={AppColors.stone[400]} />
            {props.postfix}
         </View>
         <Animated.View className='w-full'
            style={[{
               borderBottomWidth: 1,
            },rStyle]}
         />
      </TouchableOpacity>
   );
};

