import { AppColorScheme } from '../common/contexts/GlobalContext';

export function strMerge(...args: string[]): string {
   return args.join(' ');
}


export function withDarkMode(currentColorScheme: AppColorScheme, className: string) {
   if (currentColorScheme === AppColorScheme.DARK) {
      return className;
   }
}

export const delay = (time:number)=>{
   return new Promise(r => setTimeout(r, time));
};

export const areObjectEqual= (o: any, u: any)=>{
   return JSON.stringify(o) === JSON.stringify(u);
};