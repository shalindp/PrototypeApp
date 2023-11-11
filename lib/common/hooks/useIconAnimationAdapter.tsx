import Animated, { createAnimatedPropAdapter, processColor } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { Device, UserDevice } from '../../utils/device';

export const useIconAnimationAdapter = () => {
   const adapter = createAnimatedPropAdapter(
      (props) => {
         if (UserDevice !== Device.WEB) {
            if (Object.keys(props).includes('fill')) {
               //@ts-ignore
               props.fill = { type: 0, payload: processColor(props.fill) };
            }
         }
      },
      ['fill']
   );

   return {
      adapter
   };
};