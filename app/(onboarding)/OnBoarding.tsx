import React from 'react';
import { ScrollView, View } from 'react-native';
import { GenderIdentity } from '../../lib/on-boarding/GenderIdentity';
import { Age } from '../../lib/on-boarding/Age';
import { Interests } from '../../lib/on-boarding/Interests';
import { isWeb } from '../../lib/utils/device';

const Pages = [
   '1',
   '2',
   '3'
];
const OnBoarding = () => {
   return <ScrollView className="" style={{ flex: 1 }} horizontal pagingEnabled showsHorizontalScrollIndicator={isWeb}>
      <GenderIdentity />
      <Age />
      <Interests />
   </ScrollView>;
};

export default OnBoarding;