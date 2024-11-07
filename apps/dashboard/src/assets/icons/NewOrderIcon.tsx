import * as React from 'react'
import { SVGProps } from 'react'

const NewOrderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={20}
      height={24}
      x={3}
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
        d="M17.902 3.791h2.681a1.083 1.083 0 0 1 1.084 1.083V22.75a1.083 1.083 0 0 1-1.084 1.084H5.417a1.084 1.084 0 0 1-1.084-1.084V4.874a1.083 1.083 0 0 1 1.084-1.083h3.791v1.625h7.584V3.791h1.11Z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.167}
        d="M9.208 2.166h7.584v3.25H9.208v-3.25Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.167}
        d="m14.625 10.291-4.334 4.334h5.42l-4.336 4.333"
      />
    </mask>
    <g mask="url(#a)">
      <path fill={props.fill || '#797979'} d="M0 0h26v26H0V0Z" />
    </g>
  </svg>
)

export default NewOrderIcon
