import * as React from 'react'
import { SVGProps } from 'react'
const PurchaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={27}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || '#797979'}
      d="M13.635 3.399a2.167 2.167 0 0 0-1.532-.635h-7.77A2.167 2.167 0 0 0 2.168 4.93v7.77c0 .575.228 1.126.635 1.532l8.666 8.666a2.167 2.167 0 0 0 3.064 0l7.77-7.77a2.167 2.167 0 0 0 0-3.063L13.635 3.4Zm-6.051 6.948a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334Z"
    />
  </svg>
)
export default PurchaseIcon
