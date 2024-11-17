import * as React from 'react'
import { SVGProps } from 'react'
const Ball = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={252}
    height={372}
    fill="none"
    {...props}
  >
    <circle
      cx={211}
      cy={211}
      r={211}
      fill="#00897B"
      fillOpacity={0.3}
      transform="matrix(-1 0 0 1 252 -50)"
    />
    <circle
      cx={164.456}
      cy={164.456}
      r={164.456}
      fill="#00897B"
      fillOpacity={0.6}
      transform="matrix(-1 0 0 1 223.728 -37.06)"
    />
    <circle
      cx={116.877}
      cy={116.877}
      r={116.877}
      fill="#00897B"
      transform="matrix(-1 0 0 1 196.977 -23.7)"
    />
  </svg>
)
export default Ball
