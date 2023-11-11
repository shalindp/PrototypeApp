interface IAppColors {
   main: Record<number, string>,
   stone: Record<number, string>
}

export const AppColors:IAppColors ={
   main:{
      100: '#fff',
      200: '#fff',
      300: '#fff',
      400: '#fff',
      500: '#6E3FFE',
      600: '#fff',
      700: '#fff',
      800: '#fff',
      900: '#fff',
   },
   stone: {
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      350: '#cecbc9',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
   }

};