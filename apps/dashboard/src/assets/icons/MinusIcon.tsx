import * as React from 'react'
import { SVGProps } from 'react'

const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect x="4" y="11" width="16" height="2" fill={props.fill || '#fff'} />
  </svg>
)

export default MinusIcon
