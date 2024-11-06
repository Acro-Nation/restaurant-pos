import { PiPlus } from 'react-icons/pi'
import ReuseIcon from '../reuseIcon/reuseIcon'
import { SiAbbott } from 'react-icons/si'
import { CgChart } from 'react-icons/cg'

const Salestabs = () => {
  return (
    <div className=" w-[377px] border p-4 flex flex-col gap-11 rounded-lg bg-white">
      <div className="flex items-center gap-5">
        <div>
          <SiAbbott />
        </div>
        <div className="text-[20px] leading-7 font-medium">Net Sales</div>
      </div>

      <div className="flex items-center justify-between text-[14px] leading-[22px] font-medium text-[#00897B] h-[64px]">
        <div className="flex items-center">
          <CgChart />
          <div className="border-r-4 pr-4 border-[#D9D9D9]">
            +2.25% from last weekly
          </div>
        </div>

        <div className="flex gap-1 items-center h-[64px]">
          <ReuseIcon />
          <span className="text-xl font-bold text-[#00897B]">12.565.00</span>
        </div>
      </div>
    </div>
  )
}

export default Salestabs
