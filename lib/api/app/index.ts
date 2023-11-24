import { Client } from './client';

export const buildAppApClient = (): Client => {
   const baseUrl = 'http://192.168.18.39:6969';
   return new Client(baseUrl);
};