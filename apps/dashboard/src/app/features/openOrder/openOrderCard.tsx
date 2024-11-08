import Ordertotal from './ordertotal'

const OpenOrderCard = () => {
  return (
    <div className="flex justify-between bg-white rounded-xl h-[142px] p-2">
      <div className="flex flex-col gap-3">
        <ul className="flex items-center text-[24px] leading-8 font-medium h-[64px]">
          <li className="text-[#00897B] border-r-4 px-4 border-[#D9D9D9]">
            #05
          </li>
          <li className="border-r-4 px-4">MD Shakib</li>
          <li className="border-r-4 px-4">04:30 PM</li>
          <li className="px-4">02 Items</li>
          <li className="px-4">arrowIcon</li>
        </ul>
        <ul className="flex items-center text-[24px] leading-8 font-medium text-[#00897B] h-[64px]">
          <li className="border-r-4 px-4 border-[#D9D9D9]">
            Delivery Services
          </li>
          <li className="px-4">New</li>
        </ul>
      </div>
      <Ordertotal />
    </div>
  )
}

export default OpenOrderCard
