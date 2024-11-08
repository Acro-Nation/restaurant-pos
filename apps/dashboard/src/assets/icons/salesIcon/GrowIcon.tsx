import * as React from "react"
import { SVGProps } from "react"
const GrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={9}
    fill="none"
    {...props}
  >
    <path
      fill="#00897B"
      d="M8.75.5v.875h2.881L7.875 5.131 5.997 3.253a.437.437 0 0 0-.619 0L.875 7.756l.619.619 4.194-4.194L7.566 6.06a.437.437 0 0 0 .618 0l4.066-4.065v2.881h.875V.5H8.75Z"
    />
  </svg>
)
export default GrowIcon
