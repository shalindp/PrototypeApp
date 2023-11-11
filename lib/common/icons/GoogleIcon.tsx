import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
import { Ref, forwardRef } from 'react';
const SvgGoogleIcon = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
   <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 25"
      //@ts-ignore
      ref={ref}
      {...props}>
      <G fillRule="evenodd" clipPath="url(#google_icon_svg__a)" clipRule="evenodd">
         <Path
            fill="#FBBC05"
            d="M5.018 12.255c0-.778.13-1.524.36-2.224L1.34 6.947a11.977 11.977 0 0 0-1.23 5.308c0 1.908.442 3.708 1.228 5.305l4.036-3.09a7.09 7.09 0 0 1-.356-2.215Z"
         />
         <Path
            fill="#EA4335"
            d="M12.11 5.174c1.69 0 3.217.6 4.417 1.58l3.491-3.486C17.891 1.416 15.164.272 12.11.272A11.964 11.964 0 0 0 1.34 6.947l4.04 3.084a7.072 7.072 0 0 1 6.73-4.857Z"
         />
         <Path
            fill="#34A853"
            d="M12.11 19.336a7.072 7.072 0 0 1-6.732-4.856L1.34 17.563a11.964 11.964 0 0 0 10.77 6.675c2.926 0 5.72-1.039 7.818-2.986l-3.834-2.964c-1.082.682-2.444 1.048-3.985 1.048Z"
         />
         <Path
            fill="#4285F4"
            d="M23.564 12.255c0-.708-.11-1.47-.273-2.178H12.109v4.63h6.437c-.322 1.578-1.198 2.791-2.452 3.581l3.834 2.964c2.203-2.045 3.636-5.09 3.636-8.997Z"
         />
      </G>
      <Defs>
         <ClipPath id="google_icon_svg__a">
            <Path fill="#fff" d="M0 0h24v24.511H0z" />
         </ClipPath>
      </Defs>
   </Svg>
);
const ForwardRef = forwardRef(SvgGoogleIcon);
export default ForwardRef;
