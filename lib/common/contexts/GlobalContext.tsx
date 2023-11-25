import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';
import { IFadeInOutRefProps } from '../components/AppPageTransition';
import { IBottomSheetRefProps } from '../components/AppBottomSheet';
import { AuthenticationResponse, Client } from '../../api/app/client';
import { buildAppApClient } from '../../api/app';

export enum AppColorScheme {
   LIGHT = 'light',
   DARK = 'dark'
}



interface IGlobalContext {
   colorSchemeState: [AppColorScheme, React.Dispatch<React.SetStateAction<AppColorScheme>>];
   pageTransitionRef: React.MutableRefObject<IFadeInOutRefProps|null>;
   bottomSheetRef: React.MutableRefObject<IBottomSheetRefProps|null>;
   userRef:  React.MutableRefObject<AuthenticationResponse | null>;
   appApClient: Client;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

interface GlobalContextProviderProps extends PropsWithChildren {
   pageTransitionRef: React.MutableRefObject<IFadeInOutRefProps|null>;
   bottomSheetRef: React.MutableRefObject<IBottomSheetRefProps|null>;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
   children,
   pageTransitionRef,
   bottomSheetRef
}) => {
   const colorSchemeState = useState<AppColorScheme>(AppColorScheme.LIGHT);
   const userRef = useRef<AuthenticationResponse|null>(null);

   return (
      <GlobalContext.Provider value={{
         colorSchemeState,
         pageTransitionRef,
         bottomSheetRef,
         userRef,
         appApClient: buildAppApClient()
      }}>
         {children}
      </GlobalContext.Provider>
   );
};

export const useGlobalContext = () => useContext(GlobalContext)!;