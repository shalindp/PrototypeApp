import { useMutation } from '@tanstack/react-query';
import { SignUpRequest } from '../../api/app/client';
import { useCallback, useEffect, useRef } from 'react';
import { buildAppApClient } from '../../api/app';

export const useMutateWithNoReRender = ()=>{
   const result = useRef<any>();

   const {mutateAsync: signUpRequest} = useMutation({
      mutationFn:  (request:SignUpRequest) => buildAppApClient().signUp(request),
      onError: (e)=>console.log('@>',e),
      onSuccess: (e)=>console.log('@> resp',e)
   });

   const mutateCustom = useCallback(
      async () => {
         await signUpRequest(new SignUpRequest({ email: 'k', password: 'k' }));
      },
      [signUpRequest] // Dependencies for useCallback
   );

   return { mutateCustom };
};