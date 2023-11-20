import React, { FC, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { AppText } from '../common/components/AppText';
import { AppFont } from '../utils/constants/styles/AppFont';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AppColors } from '../utils/constants/styles/AppColors';
import { AppTextError, IAppTextErrorRef } from '../common/components/AppTextError';
import dayjs from 'dayjs';

interface IAge extends IAppComponent {
}


export interface IAgeRef {
   getValue: () => {
      dob: dayjs.Dayjs
   };
}

interface DateInput {
   day: string;
   month: string;
   year: string;
}

// eslint-disable-next-line react/display-name
export const Age = forwardRef<IAgeRef, IAge>((props, ref) => {
   const colorDelta = useSharedValue<string>(AppColors.stone[350]);

   const date = useRef<DateInput>({
      day: '',
      month: '',
      year: ''
   });

   const dayInputRef = useRef<TextInput>(null);
   const monthInputRef = useRef<TextInput>(null);
   const yearInputRef = useRef<TextInput>(null);
   const onFocus = () => {
      const { day, month, year } = date.current;

      if (day === '' && month === '' && year === '') {
         dayInputRef.current.focus();
         colorDelta.value = withTiming(AppColors.main[500], { duration: 600 });
      }
   };

   const onBlur = () => {
      colorDelta.value = withTiming(AppColors.stone[350], { duration: 600 });
   };

   const onText = (text: string, field: keyof DateInput) => {
      switch (field) {
      case 'day': {
         date.current.day = text;
         if (`${date.current.day}`.length === 2 && date.current.month === '') {
            monthInputRef.current.focus();
         }
         break;
      }
      case 'month': {
         date.current.month = text;
         if (date.current.month.toString().length === 2 && date.current.year === '') {
            yearInputRef.current.focus();
         }
         break;

      }
      case 'year': {
         date.current.year = text;
         break;

      }
      }
   };

   const rStyleUnderLine = useAnimatedStyle(() => {
      return {
         backgroundColor: colorDelta.value
      };
   }, []);


   const rStyleSeparator = useAnimatedStyle(() => {
      return {
         color: colorDelta.value
      };
   }, []);


   const error = useRef<IAppTextErrorRef>(null);

   const getValue = () => {
      const { day, month, year } = date.current;
      try {
         if (day === '' && month === '' && year === '') {
            error.current.setError('Sorry, date of birth cannot be empty.');
            return;
         }
         error.current.setError('');
         const dob = dayjs(`${year}-${month}-${day}`);

         const eighteenYearsAgo = dayjs().subtract(18, 'year');
         const isAboveRequiredYears = dayjs(dob).isBefore(eighteenYearsAgo);
         if (isAboveRequiredYears) {
            return { dob };
         } else {
            error.current.setError('Sorry, you must be latest 18 years old to continue.');
         }
      } catch (e) {
         console.error(e);
         error.current.setError('Sorry, that is a invalid date.');
      }
   };

   useImperativeHandle(ref, () => ({ getValue }), []);

   console.log('@> rerender');
   return <View
      className={twMerge('flex justify-center items-center -mt-16', props.class)}
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <AppText frontFamily={AppFont.SatoshiMedium} class='text-xl mb-16'>{'When is your date of birth?'}</AppText>
      <View className='w-full px-8'>
         <View className='flex flex-row justify-center items-center'>
            <TextInput
               placeholder='DD'
               className='text-stone-600 text-[22px] flex-1 text-center'
               maxLength={2}
               onFocus={onFocus}
               onBlur={onBlur}
               keyboardType='numeric'
               ref={dayInputRef}
               onChangeText={(c) => onText(c, 'day')} />
            <Animated.Text className='text-[22px] text-stone-350' style={rStyleSeparator}>{'  /  '}</Animated.Text>
            <TextInput
               placeholder='MM'
               className='text-stone-600 text-[22px] flex-1 text-center'
               maxLength={2}
               onFocus={onFocus}
               onBlur={onBlur}
               keyboardType='numeric'
               ref={monthInputRef}
               onChangeText={(c) => onText(c, 'month')} />
            <Animated.Text className='text-[22px] text-stone-350' style={rStyleSeparator}>{'  /  '}</Animated.Text>
            <TextInput
               placeholder='YYYY'
               className='text-stone-600 text-[22px] flex-1 text-center'
               maxLength={4}
               onFocus={onFocus}
               onBlur={onBlur}
               keyboardType='numeric'
               ref={yearInputRef}
               onChangeText={(c) => onText(c, 'year')} />
         </View>
         <Animated.View className='bg-stone-350 w-full h-[.8px]' style={rStyleUnderLine} />
         <AppTextError text='' ref={error} />
      </View>
   </View>;
});