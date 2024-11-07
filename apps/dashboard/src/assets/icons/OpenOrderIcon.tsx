import * as React from 'react'
import { SVGProps } from 'react'
const OpenOrder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || '#797979'}
      fillRule="evenodd"
      d="M1.052.969C.417 1.604.417 2.624.417 4.667v9.75c0 2.043 0 3.064.635 3.699.635.635 1.655.635 3.698.635h6.5c2.043 0 3.064 0 3.699-.635.635-.635.635-1.655.635-3.699v-9.75c0-2.043 0-3.063-.635-3.698-.635-.635-1.655-.635-3.699-.635h-6.5c-2.043 0-3.063 0-3.698.635ZM4.75 4.667a1.083 1.083 0 1 0 0 2.167h6.5a1.084 1.084 0 0 0 0-2.167h-6.5Zm0 4.334a1.083 1.083 0 0 0 0 2.166h6.5a1.083 1.083 0 1 0 0-2.166h-6.5Zm0 4.333a1.083 1.083 0 1 0 0 2.167h4.334a1.084 1.084 0 0 0 0-2.167H4.75Z"
      clipRule="evenodd"
    />
  </svg>
)
export default OpenOrder
