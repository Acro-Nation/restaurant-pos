import * as React from 'react'
import { SVGProps } from 'react'
const CartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <g fill="#00897B">
      <path d="M8.667 6.067a4.333 4.333 0 1 1 8.667 0v.866h1.733v-.866a6.066 6.066 0 1 0-12.133 0v.866h1.733v-.866Z" />
      <path
        fillRule="evenodd"
        d="M3.3 10.978a2.6 2.6 0 0 1 2.585-2.312h14.23a2.6 2.6 0 0 1 2.583 2.312l1.35 12.134a2.601 2.601 0 0 1-2.584 2.887H4.536a2.598 2.598 0 0 1-2.583-2.887L3.3 10.978Zm8.833 4.621v-3.466h1.734v3.466h3.466v1.734h-3.466v3.466h-1.734v-3.466H8.667v-1.734h3.466Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default CartIcon
