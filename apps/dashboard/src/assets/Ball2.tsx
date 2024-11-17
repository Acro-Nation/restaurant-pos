import * as React from 'react'
const Ball2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={252}
    height={372}
    fill="none"
    {...props}
  >
    <circle cx={211} cy={161} r={211} fill="#00897B" fillOpacity={0.3} />
    <circle
      cx={192.728}
      cy={127.395}
      r={164.456}
      fill="#00897B"
      fillOpacity={0.6}
    />
    <circle cx={171.9} cy={93.178} r={116.877} fill="#00897B" />
  </svg>
)
export default Ball2
