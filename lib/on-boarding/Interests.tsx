import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/device';
import { IAppComponent } from '../utils/interfaces';
import { twMerge } from 'tailwind-merge';
import { AppText } from '../common/components/AppText';
import { AppInputField } from '../common/components/AppInputField';
import { Ionicons } from '@expo/vector-icons';

interface IInterests extends IAppComponent {

}

export const Interests: FC<IInterests> = (props) => {
   const [interests, sInterests] = useState<Array<string>>([]);

   return <View
      className={twMerge('flex justify-center items-center -mt-16', props.class)}
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <View className='w-full px-8'>
         <AppInputField
            placeholder='hiking' class='mb-8'
            onChangeText={(c)=>sInterests((p=>([...p, c])))}
         />
         <View className='flex flex-row flex-wrap'>
            {interests.map((c, i)=>{
               return <TouchableOpacity
                  key={i}
                  className='w-fit h-fit px-3 py-1 rounded-[20px] bg-main-500/30 flex flex-row justify-center items-center mr-2 mb-2'>
                  <AppText class="mr-1">{c}</AppText>
                  <Ionicons name="close-circle-sharp" size={24} color="black" />
               </TouchableOpacity>;
            })}
         </View>
      </View>
   </View>;
};