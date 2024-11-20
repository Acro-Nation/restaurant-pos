import * as React from "react"
const RightArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    fill="none"
    {...props}
  >
    <rect width={45} height={45} fill="#181818" rx={4} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="m27.003 23.27-6.128 6.128-1.532-1.532 5.362-5.362-5.362-5.363 1.532-1.532 6.128 6.129a1.083 1.083 0 0 1 0 1.532Z"
      clipRule="evenodd"
    />
  </svg>
)
export default RightArrowIcon