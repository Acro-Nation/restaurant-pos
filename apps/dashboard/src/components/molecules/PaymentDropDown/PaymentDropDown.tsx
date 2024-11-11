'use client'
import { LockIcon } from 'lucide-react'
import React, { useState } from 'react'
import PaymentItemCard from './PaymentItemCard'
import PaymentSubtotal from './PaymentSubtotal'
import PaymentTotal from './PaymentTotal'
import { Button } from '@/components/atoms/button'

const Dropdown: React.FC<DropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full px-4 py-2  rounded-md focus:outline-none"
      >
        <LockIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 max-w-[518px] mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg mx-auto p-6">
          <div className="w-full space-y-16">
            <div className="space-y-3">
              <PaymentItemCard />
              <PaymentItemCard />
            </div>
            <div className="space-y-3">
              <PaymentSubtotal />
              <PaymentTotal />
            </div>
          </div>
          <Button className="w-full mt-5">Confirm Payment</Button>
        </div>
      )}
    </div>
  )
}

export default Dropdown
