import React, { FC } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListRenderItem } from '@shopify/flash-list/src/FlashListProps';
import { AppText } from '../common/components/AppText';

type GenderItem = {
   id: number,
   label: string
}

interface IGenderList {
   items: Array<GenderItem>;
}

export const GenderList: FC<IGenderList> = (props) => {
   return <FlashList
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.items}
      renderItem={({ item }) => <AppText class="bg-red-500 py-10">{item.label}</AppText>}
   />;
};