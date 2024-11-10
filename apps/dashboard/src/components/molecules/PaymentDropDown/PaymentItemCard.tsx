import PlusIcon from '@/assets/icons/PlusIcon'
import TkIcon from '@/assets/icons/TkIcon'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'

const PaymentItemCard = () => {
  return (
    <div className="min-w-[434px] border flex flex-col gap-5 rounded-xl bg-[#F9F9F9] h-[112px] p-3">
      <div className="flex justify-between">
        <div className="text-[24px] font-semibold">Bruschetta</div>
        <ReuseIcon icon={<PlusIcon />} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <ReuseIcon icon={<TkIcon />} bgColor="black" />
          <span className="text-xl font-bold">150.00</span>
        </div>
        <ReuseIcon />
      </div>
    </div>
  )
}

export default PaymentItemCard
