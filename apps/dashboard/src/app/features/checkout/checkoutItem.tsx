import DeleteIcon from '@/assets/icons/DeleteIcon'
import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import TkIcon from '@/assets/icons/TkIcon'
import { Separator } from '@/components/atoms/separator'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'

export const CheckoutItem: React.FC<Order> = ({
  dishName = 'xyz',
  orderType = 'Dine-In',
  tableNo,
  amount,
}) => {
  return (
    <div className="bg-white h-[84px] flex justify-center flex-col rounded-lg text-lg">
      <div className="h-5 space-x-4  flex items-center justify-around">
        <div>{dishName}</div>
        <Separator orientation="vertical" />
        <div>{orderType}</div>
        <Separator orientation="vertical" />
        <div>Table No: {tableNo}</div>
        <Separator orientation="vertical" />
        <div className="flex gap-2">
          <ReuseIcon icon={<TkIcon />} bgColor="black" />
          <span> {amount}</span>
        </div>

        <div className="flex gap-2">
          <ReuseIcon icon={<MinusIcon />} />
          <span>3</span>
          <ReuseIcon icon={<PlusIcon />} />
        </div>
        <div>
          <DeleteIcon />
        </div>
      </div>
    </div>
  )
}
