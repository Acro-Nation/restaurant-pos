import * as React from 'react'
import { SVGProps } from 'react'
const CategoryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={23}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || '#797979'}
      fillRule="evenodd"
      d="M11.083 4.583a4.334 4.334 0 1 1 4.334 4.334h-3.25a1.083 1.083 0 0 1-1.084-1.084v-3.25Zm-10.833 0a4.333 4.333 0 1 1 8.667 0v3.25a1.083 1.083 0 0 1-1.084 1.084h-3.25A4.333 4.333 0 0 1 .25 4.583Zm0 10.834a4.334 4.334 0 0 1 4.333-4.334h3.25a1.084 1.084 0 0 1 1.084 1.084v3.25a4.333 4.333 0 0 1-8.667 0Zm10.833-3.25a1.084 1.084 0 0 1 1.084-1.084h3.25a4.334 4.334 0 1 1-4.334 4.334v-3.25Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CategoryIcon
