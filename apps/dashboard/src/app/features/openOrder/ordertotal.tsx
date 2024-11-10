import TkIcon from '@/assets/icons/TkIcon'
import ReuseIcon from '../../../components/common/reuseIcon/reuseIcon'

const Ordertotal = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[24px] leading-8 font-medium h-[64px]">
        Total Payment
      </p>
      <div className="flex gap-1 items-center h-[64px]">
        <ReuseIcon bgColor="black" icon={<TkIcon />} />
        <span className="text-xl font-bold text-primary">150.00</span>
        <button className="bg-[#4BBF7414] py-1 px-4 text-[#4BBF74] rounded">
          Paid Online
        </button>
      </div>
    </div>
  )
}

export default Ordertotal
