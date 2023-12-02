import React, { FC } from 'react';
import { FlashList } from '@shopify/flash-list';
import { AppText } from '../common/components/AppText';
import { GenderIdentityResponse } from '../api/app/client';
import { TouchableOpacity, View } from 'react-native';

interface IGenderList {
   items: Array<GenderIdentityResponse>;
}

export const GenderList: FC<IGenderList> = (props) => {
   return <View className="flex flex-1"><FlashList
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      data={props.items}
      estimatedItemSize={10}
      renderItem={({ item }) => <TouchableOpacity><AppText class="pb-4 px-4 text-[18px]">{item.value}</AppText></TouchableOpacity>}
   /></View>;
};