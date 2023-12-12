import React, { createContext, PropsWithChildren, useContext } from 'react';
import { AppLoadingScreen } from '../components/AppLoadingScreen';
import { useGlobalContext } from './GlobalContext';
import { useQuery } from '@tanstack/react-query';
import { GenderIdentityResponse } from '../../api/app/client';

interface IOnBoardingContext {
   genderIdentities : GenderIdentityResponse[];
}

const OnBoardingContext = createContext<IOnBoardingContext | undefined>(undefined);

interface OnBoardingContextProviderProps extends PropsWithChildren {
}

export const OnBoardingContextProvider: React.FC<OnBoardingContextProviderProps> = ({
   children
}) => {
   const { appApClient, pageTransitionRef } = useGlobalContext();

   const gendersQuery = useQuery({ queryKey: ['genders'], queryFn: () => appApClient.getGenderIdentities() });

   if(gendersQuery.data){
      return (
         <OnBoardingContext.Provider value={{genderIdentities: gendersQuery.data}}>
            {children}
         </OnBoardingContext.Provider>
      );
   }

   return <AppLoadingScreen />;
};

export const useOnBoardingContext = () => useContext(OnBoardingContext)!;