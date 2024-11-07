
import ReuseIcon from '../reuseIcon/reuseIcon'

const NewOrderCard = () => {
  return (
    <div className=" w-[250px] border p-4 flex flex-col gap-11 rounded-xl bg-white">
      <div className="text-[24px] leading-9 font-semibold">Bruschetta</div>
      <div className="flex justify-between h-[26px]">
        <div className="flex gap-2 justify-center items-center">
          <ReuseIcon />
          <span className="text-xl leading-[26px] font-bold text-[#00897B]">
            150.00
          </span>
        </div>
        <ReuseIcon />
      </div>
    </div>
  )
}

export default NewOrderCard
