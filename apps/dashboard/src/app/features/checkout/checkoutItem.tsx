import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import TkIcon from '@/assets/icons/TkIcon'
import { Separator } from '@/components/atoms/separator'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'

export function CheckoutItem() {
  return (
    <div className="bg-white h-[84px] flex justify-center flex-col rounded-lg text-lg">
      <div className="h-5 space-x-4  flex items-center justify-around">
        <div>Stuffed Mushrooms</div>
        <Separator orientation="vertical" />
        <div>Dine-In</div>
        <Separator orientation="vertical" />
        <div>Table No: 24 - 06</div>
        <Separator orientation="vertical" />
        <div className="flex gap-2">
          <ReuseIcon icon={<TkIcon />} bgColor="black" />
          <span> 250.00</span>
        </div>
        <Separator orientation="vertical" />
        <div>250.00</div>

        <div className="flex gap-2">
          <ReuseIcon icon={<MinusIcon />} />
          <span>3</span>
          <ReuseIcon icon={<PlusIcon />} />
        </div>
        <div>
          {' '}
          <ReuseIcon icon={<TkIcon />} bgColor="black" />
        </div>
      </div>
    </div>
  )
}
