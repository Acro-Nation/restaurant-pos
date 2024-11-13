import * as React from 'react'
import { SVGProps } from 'react'
const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="red"
      d="M2.347 13.667c-.384 0-.704-.128-.96-.385A1.308 1.308 0 0 1 1 12.32V2H.167v-.833H3.5V.525h5v.642h3.334V2H11v10.321c0 .384-.128.704-.385.961a1.3 1.3 0 0 1-.961.385H2.347Zm1.827-2.5h.833v-7.5h-.833v7.5Zm2.82 0h.833v-7.5h-.833v7.5Z"
    />
  </svg>
)
export default DeleteIcon
