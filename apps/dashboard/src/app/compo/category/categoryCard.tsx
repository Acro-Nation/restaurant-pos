import React from 'react'
import ReuseIcon from '../reuseIcon/reuseIcon'


const CategoryCard = () => {
  return (
    <div className="w-[406px] border p-4 flex flex-col gap-11 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <div className="text-[24px] leading-9 font-semibold">
          Tuna Salad Sandwich
        </div>
        <ReuseIcon  />
      </div>

      <div className="flex gap-2">
        <ReuseIcon />
        <span className="text-xl leading-[26px] font-bold text-[#00897B]">
          150.00
        </span>
      </div>
    </div>
  )
}

export default CategoryCard
