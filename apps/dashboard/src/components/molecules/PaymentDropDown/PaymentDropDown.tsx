'use client'

import React, { useState } from 'react'

interface DropdownProps {
  items?: string[]
  onSelect?: (item: string) => void
}

const Dropdown: React.FC<DropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
      >
        Select an option
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-[500px] mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          this is component
        </div>
      )}
    </div>
  )
}

export default Dropdown
