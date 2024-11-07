import * as React from 'react'
import { SVGProps } from 'react'
const TableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || '#797979'}
      d="M1.9 15.848a4.55 4.55 0 0 0 4.55 4.55h10.178a5.83 5.83 0 0 1-3.678 1.3h-6.5a5.85 5.85 0 0 1-5.85-5.85v-6.5a5.83 5.83 0 0 1 1.3-3.677v10.177Zm16.25 3.25H16.2v-5.2h5.2v1.95a3.25 3.25 0 0 1-3.25 3.25Zm-1.95-11.7v5.2h5.2v-5.2h-5.2Zm-6.5 5.2h5.2v-5.2H9.7v5.2Zm5.2 1.3H9.7v5.2h5.2v-5.2Zm-6.5-6.5v5.2H3.2v-5.2h5.2Zm0 6.5H3.2v1.95a3.25 3.25 0 0 0 3.25 3.25H8.4v-5.2Zm13-7.8h-5.2v-5.2h1.95a3.25 3.25 0 0 1 3.25 3.25v1.95Zm-6.5 0v-5.2H9.7v5.2h5.2Zm-6.5 0v-5.2H6.45a3.25 3.25 0 0 0-3.25 3.25v1.95h5.2Z"
    />
  </svg>
)
export default TableIcon
