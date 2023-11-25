import { IAppTextErrorRef } from '../../common/components/AppTextError';
import React from 'react';
import { ZodIssue } from 'zod-validation-error';
import { firstOrDefault, notNullOrUndefined } from '../functions';

export const setErrorFromZod = (errorRef: React.RefObject<IAppTextErrorRef>,  errors: ZodIssue[])=>{
   if(errors.length> 0){
      const errorMessage = firstOrDefault(errors, c=> notNullOrUndefined(c.message))?.message;
      errorRef.current?.setError(errorMessage);
   }
};