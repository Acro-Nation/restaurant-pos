import * as React from 'react'
import { SVGProps } from 'react'
const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="#181818"
      d="M15 2.5a8.75 8.75 0 0 1 2.829.467 5.625 5.625 0 0 0 5.625 9.31l.296-.098v3.48c0 .145.026.288.075.425l.058.134 2.145 4.29a1.375 1.375 0 0 1-1.087 1.983l-.143.008H5.203a1.376 1.376 0 0 1-1.288-1.859l.058-.131 2.146-4.291c.064-.13.106-.27.122-.414l.01-.144v-4.41A8.75 8.75 0 0 1 15 2.5Zm0 23.75a3.75 3.75 0 0 1-3.537-2.5h7.075A3.75 3.75 0 0 1 15 26.25Z"
    />
    <path
      fill="red"
      d="M24.402 4.098a3.75 3.75 0 1 0-5.304 5.304 3.75 3.75 0 0 0 5.304-5.304Z"
    />
  </svg>
)
export default NotificationIcon
