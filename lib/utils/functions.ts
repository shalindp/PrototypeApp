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
   console.log('@> o',JSON.stringify(o));
   console.log('@> u',JSON.stringify(u));
   console.log('@> 3',JSON.stringify(u)===JSON.stringify(o));

   return JSON.stringify(o) === JSON.stringify(u);
};