import * as React from 'react'
import { SVGProps } from 'react'
const SalesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={27}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={22}
      height={25}
      x={2}
      y={1}
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
        d="M22.209 8.18 13 2.764 3.792 8.18v10.834L13 24.43l9.209-5.416V8.18Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.167}
        d="M13 12.514v4.334m4.334-6.5v6.5M8.667 14.68v2.167"
      />
    </mask>
    <g mask="url(#a)">
      <path fill={props.fill || '#797979'} d="M0 .598h26v26H0v-26Z" />
    </g>
  </svg>
)
export default SalesIcon
