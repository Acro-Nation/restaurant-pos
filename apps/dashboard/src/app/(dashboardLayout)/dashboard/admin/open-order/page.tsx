import OpenOrderCard from '@/app/features/openOrder/openOrderCard'
import React from 'react'

const OpenOrderPage = () => {
  return (
    <div className="p-6">
      <OpenOrderCard
        slNo={1}
        customerName="Go"
        orderType="Dine-In"
        status=""
        time=""
        totalOrderItems={1}
        tableNo={1}
      />
    </div>
  )
}

export default OpenOrderPage
