import Ordertotal from './ordertotal'

const OpenOrderCard: React.FC<OpenOrderDetails> = ({
  slNo = 1,
  customerName = 'Rakib',
  time = '12:pm',
  totalOrderItems = 2,
  orderType = 'Dine-in',
  tableNo = 12,
  status = 'New',
}) => {
  return (
    <div className="flex justify-between bg-white rounded-xl h-[142px] p-2">
      <div className="flex flex-col gap-3">
        <ul className="flex items-center text-[24px] leading-8 font-medium h-[64px]">
          <li className="text-primary border-r-4 px-4 border-[#D9D9D9]">
            #{slNo}
          </li>
          <li className="border-r-4 px-4">{customerName}</li>
          <li className="border-r-4 px-4">{time}</li>
          <li className="px-4">{totalOrderItems} Items</li>
          <li className="px-4">arrow</li>
        </ul>
        <ul className="flex items-center text-[24px] leading-8 font-medium text-primary h-[64px]">
          <li className="border-r-4 px-4 border-[#D9D9D9]">{orderType}</li>
          <li className="border-r-4 px-4 border-[#D9D9D9]">Table {tableNo}</li>
          <li className="px-4">{status}</li>
        </ul>
      </div>
      <Ordertotal />
    </div>
  )
}

export default OpenOrderCard
