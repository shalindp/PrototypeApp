import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { UseLottie } from '../hooks/useLottie';

export enum AppColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface IGlobalContext {
  colorScheme: [AppColorScheme, React.Dispatch<React.SetStateAction<AppColorScheme>>];
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const colorScheme = useState<AppColorScheme>(AppColorScheme.LIGHT);

   return (
      <GlobalContext.Provider value={{ colorScheme }}>
         {children}
      </GlobalContext.Provider>
   );
};

export const useGlobalContext = () => useContext(GlobalContext)!;