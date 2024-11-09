import * as React from 'react'
import { SVGProps } from 'react'
const TkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <text
      x={4}
      y={18}
      fill={props.fill || '#fff'}
      fontFamily="Arial, sans-serif"
      fontSize={18}
      fontWeight={600}
    >
      {'\u09F3'}
    </text>
  </svg>
)
export default TkIcon
