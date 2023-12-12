import { Dimensions, Platform } from 'react-native';

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export enum Device {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web'
}

const getDevice = () => {
   switch (Platform.OS) {
   case 'ios':
      return Device.IOS;
   case 'android':
      return Device.ANDROID;
   case 'web':
      return Device.WEB;
   }
};

interface WithDeviceParams<T> {
    ios?: T;
    android?: T,
    web?: T
}
export const withDevice = <T>(params: WithDeviceParams<T>):T=>{
   switch (UserDevice){
   case Device.IOS:{
      return params.ios!;
   }
   case Device.ANDROID:{
      return params.android!;
   }
   case Device.WEB:{
      return params.web!;
   }
   }
};

export const UserDevice: Device = getDevice()!;
export const isAndroid = UserDevice === Device.ANDROID;
export const isIos = UserDevice === Device.IOS;
export const isWeb = UserDevice === Device.WEB;
