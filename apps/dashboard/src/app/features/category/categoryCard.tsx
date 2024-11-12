import PlusIcon from '@/assets/icons/PlusIcon'
import TkIcon from '@/assets/icons/TkIcon'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'
import { TCategoty } from '@/types/common'

const CategoryCard = ({ title, amount }: TCategoty) => {
  return (
    <div className="max-w-[377px] border p-4 flex flex-col gap-11 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <div className="text-[24px] leading-9 font-semibold">{title}</div>
        <ReuseIcon icon={<PlusIcon />} />
      </div>

      <div className="flex gap-2">
        <ReuseIcon icon={<TkIcon />} />
        <span className="text-xl leading-[26px] font-bold text-primary">
          {amount}
        </span>
      </div>
    </div>
  )
}

export default CategoryCard
