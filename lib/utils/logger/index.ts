import { initialiseObjectStorageAsync, readObjectToStorageAsync, writeObjectToStorageAsync } from '../AsyncStorage';
import dayjs, { Dayjs } from 'dayjs';

const LOGS_STORAGE_KEY = '_log';

enum LogLevel {
   Information = 'Information',
   Warning = 'Warning',
   Error = 'Error'
}

enum Action {
   //auth
   Auth_SIGN_IN = 'Auth_SIGN_IN',
   Auth_SIGN_UP = 'Auth_SIGN_UP',
}

interface ILog {
   timestamp: number,
   logLevel: LogLevel,
   action: Action,
   message: any
}

export const LogError = async (action: Action, message: any) => {
   const logs = await initialiseLogger();
   if(logs){
      const newLog: ILog = {
         timestamp: dayjs().utcOffset().valueOf(),
         logLevel: LogLevel.Error,
         action,
         message,
      };
      logs.push(newLog);
      console.log(logs);
      await writeObjectToStorageAsync(LOGS_STORAGE_KEY, logs);
   }
};


export const logInformation = async (action: Action, message: any) => {
   const logs = await initialiseLogger();
   if(logs){
      const newLog: ILog = {
         timestamp: dayjs().utcOffset().valueOf(),
         logLevel: LogLevel.Information,
         action,
         message,
      };
      logs.push(newLog);
      await writeObjectToStorageAsync(LOGS_STORAGE_KEY, logs);
   }
};


export const LogWarning = async (action: Action, message: any) => {
   const logs = await initialiseLogger();
   if(logs){
      const newLog: ILog = {
         timestamp: dayjs().utcOffset().valueOf(),
         logLevel: LogLevel.Warning,
         action,
         message,
      };
      logs.push(newLog);
      await writeObjectToStorageAsync(LOGS_STORAGE_KEY, logs);
   }
};

const initialiseLogger = async () => {
   const defaultLogs: Array<ILog> = [];

   try {
      const result = await initialiseObjectStorageAsync(LOGS_STORAGE_KEY, defaultLogs);
      return result as Array<ILog>;
   } catch (error) { /* empty */ }
};