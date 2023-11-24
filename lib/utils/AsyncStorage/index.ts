import AsyncStorage from '@react-native-async-storage/async-storage';

export const writeObjectToStorageAsync = async (key: string, value: object) => {
   try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
   } catch (e) {
      // saving error
   }
};

export const readObjectToStorageAsync = async (key: string) => {
   try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
   } catch (e) {
      // error reading value
   }
};

export const initialiseObjectStorageAsync = async (key: string, object: object): Promise<object> => {
   try {
      const existingObject = await readObjectToStorageAsync(key);

      if (existingObject !== null) {
         return existingObject;
      } else {
         // If the object doesn't exist, create and save it
         await writeObjectToStorageAsync(key, object);
         return object;
      }
   } catch (e) {
      // handle errors
      throw new Error('Error accessing storage');
   }
};
