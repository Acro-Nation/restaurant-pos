import * as React from 'react'
import { SVGProps } from 'react'
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill={props.fill || '#fff'} d="M11 4h2v16h-2z" />
    <path fill={props.fill || '#fff'} d="M4 11h16v2H4z" />
  </svg>
)
export default PlusIcon
