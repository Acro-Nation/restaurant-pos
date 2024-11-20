import * as React from 'react'
import { SVGProps } from 'react'
const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || '#797979'}
      fillRule="evenodd"
      d="M10.796 2.243C12.653 1.825 14 3.421 14 5v14c0 1.578-1.347 3.174-3.204 2.756C6.334 20.751 3 16.765 3 12s3.334-8.752 7.796-9.756Zm5.497 6.05a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.413l-3 3a1 1 0 0 1-1.414-1.414L17.586 13H9a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </svg>
)
export default LogoutIcon
