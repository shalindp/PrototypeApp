import { Client } from './client';
import React from 'react';

export const buildAppApClient = (): Client => {
   const baseUrl = 'http://192.168.18.39:6969';
   return new Client(baseUrl);
};

export interface IMutate<TRequest, TRequestParams, TSuccessResponse, TErrorResponse> {
   mutateFn: (req: TRequest)=> Promise<TSuccessResponse>,
   requestValues: React.MutableRefObject<TRequestParams>,
   onError: (e: TErrorResponse) => void,
   onSuccess: (result: TSuccessResponse)=> void;
}