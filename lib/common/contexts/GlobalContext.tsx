import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { IFadeInOutRefProps } from '../components/AppPageTransition';
import { IBottomSheetRefProps } from '../components/AppBottomSheet';

export enum AppColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface IGlobalContext {
  colorScheme: [AppColorScheme, React.Dispatch<React.SetStateAction<AppColorScheme>>];
   pageTransition: React.MutableRefObject<IFadeInOutRefProps>
   bottomSheet: React.MutableRefObject<IBottomSheetRefProps>
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

interface GlobalContextProviderProps extends PropsWithChildren{
   pageTransitionRef: React.MutableRefObject<IFadeInOutRefProps>
   bottomSheetRef: React.MutableRefObject<IBottomSheetRefProps>
}
export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children, pageTransitionRef  , bottomSheetRef}) => {
   const colorScheme = useState<AppColorScheme>(AppColorScheme.LIGHT);

   return (
      <GlobalContext.Provider value={{ colorScheme, pageTransition: pageTransitionRef, bottomSheet:  bottomSheetRef}}>
         {children}
      </GlobalContext.Provider>
   );
};

export const useGlobalContext = () => useContext(GlobalContext)!;