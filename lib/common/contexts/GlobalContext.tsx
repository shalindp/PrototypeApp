import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { IFadeInOutRefProps } from '../components/PageTransition';

export enum AppColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface IGlobalContext {
  colorScheme: [AppColorScheme, React.Dispatch<React.SetStateAction<AppColorScheme>>];
   pageTransition: React.MutableRefObject<IFadeInOutRefProps>
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

interface GlobalContextProviderProps extends PropsWithChildren{
   pageTransitionRef: React.MutableRefObject<IFadeInOutRefProps>
}
export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children, pageTransitionRef  }) => {
   const colorScheme = useState<AppColorScheme>(AppColorScheme.LIGHT);

   return (
      <GlobalContext.Provider value={{ colorScheme, pageTransition: pageTransitionRef }}>
         {children}
      </GlobalContext.Provider>
   );
};

export const useGlobalContext = () => useContext(GlobalContext)!;