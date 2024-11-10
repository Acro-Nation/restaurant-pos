


import * as React from 'react'
import { SVGProps } from 'react'

const SaleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={25}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={22}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={2.167}
        d="M20.209 7.18 11 1.764 1.792 7.18v10.834L11 23.43l9.209-5.416V7.18Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.167}
        d="M11 11.514v4.334m4.334-6.5v6.5M6.667 13.68v2.167"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#797979" d="M-2-.402h26v26H-2v-26Z" />
    </g>
  </svg>
)
export default SaleIcon
