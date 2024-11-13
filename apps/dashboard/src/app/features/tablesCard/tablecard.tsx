'use client'

import React, { useState } from 'react'
import ReuseIcon from '../../../components/common/reuseIcon/reuseIcon'

const TableCard = () => {
  const [select, setSelect] = useState(false)

  const handleClick = () => {
    setSelect(!select) // Toggle selection state
  }

  return (
    <div
      className={`lg:max-w-[220px] border p-4 flex flex-col gap-11 rounded-lg
        ${select ? 'bg-primary' : 'bg-white'}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <button
          className={`bg-[#4BBF7414] py-1 px-4 rounded ${select ? 'text-white' : 'text-[#4BBF74] '}`}
        >
          {`${select ? 'Selected' : 'Available'}`}
        </button>
        <ReuseIcon bgColor={`${select ? 'white' : 'gray'}`} size={12} />
      </div>

      <div className="flex gap-2 justify-between">
        <span
          className={`text-xl leading-[26px] font-bold ${select ? 'text-white' : 'text-black'}`}
        >
          Table 01
        </span>
        <ReuseIcon size={12} />
      </div>
    </div>
  )
}

export default TableCard
