import * as React from "react"
import { SVGProps } from "react"
const SaleIGroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
  width={26}
  height={27}
  viewBox="0 0 26 27"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <mask
    id="mask0_1060_74"
    style={{
      maskType: "luminance",
    }}
    maskUnits="userSpaceOnUse"
    x={2}
    y={1}
    width={22}
    height={25}
  >
    <path
      d="M22.2087 8.18034L13.0003 2.76367L3.79199 8.18034V19.0137L13.0003 24.4303L22.2087 19.0137V8.18034Z"
      fill="white"
      stroke="white"
      strokeWidth={2.16667}
      strokeLinejoin="round"
    />
    <path
      d="M13.0003 12.5143V16.8477M17.3337 10.3477V16.8477M8.66699 14.681V16.8477"
      stroke="black"
      strokeWidth={2.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </mask>
  <g mask="url(#mask0_1060_74)">
    <path d="M0 0.597656H26V26.5977H0V0.597656Z"  
      fill={props.fill || '#797979'}
       />
  </g>
</svg>
)
export default SaleIGroupIcon
