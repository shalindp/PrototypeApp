import { AppColorScheme } from '../common/contexts/GlobalContext';

export function strMerge(...args: string[]): string {
   return args.join(' ');
}


export function withDarkMode(currentColorScheme: AppColorScheme, className: string) {
   if (currentColorScheme === AppColorScheme.DARK) {
      return className;
   }
}

export const delay = (time: number) => {
   return new Promise(r => setTimeout(r, time));
};

export const areObjectEqual = (o: any, u: any) => {
   return JSON.stringify(o) === JSON.stringify(u);
};

export const firstOrDefault = <T>(array: T[], predicate: (item: T) => boolean, defaultValue: T | null = null): T | null => {
   const foundItem = array.find(predicate);
   return foundItem !== undefined ? foundItem : defaultValue;
};

export const notNullOrUndefined = <T>(value: T)=>{
   return !(value === undefined || value === null);
};
