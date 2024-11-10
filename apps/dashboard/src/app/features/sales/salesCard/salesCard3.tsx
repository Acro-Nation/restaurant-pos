import GrowIcon from '@/assets/icons/salesIcon/GrowIcon'
import TkIcon from '@/assets/icons/TkIcon'
const salesData = [
  { label: 'Gross Sales' },
  { label: 'Gross Sales' },
  { label: 'Net Sales' },
]

const SalesCard3 = () => {
  return (
    <div className="max-w-[502px] h-[450px] border p-4 flex flex-col gap-11 rounded-lg bg-white">
      <div className="flex items-center text-[14px] leading-[22px] font-medium text-primary h-[64px] gap-2 ">
        <GrowIcon />
        <div className="">+2.25% from last weekly</div>
      </div>

      <div className="space-y-5 p-2">
        {salesData.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-[20px]">{item.label}</span>

            <div className="flex items-center">
              <TkIcon fill="#00897B" />
              <span>12000</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesCard3
