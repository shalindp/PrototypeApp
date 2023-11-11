import React from 'react';
import {View} from 'react-native';
import {AppText} from '../lib/common/components/AppText';

const Missing = () => {
   return (
      <View>
         <AppText>{'oh no! page was not found :('}</AppText>
      </View>
   );
};

export default Missing;