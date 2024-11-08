
import NewOrderCard from '@/app/features/newOrderCard/newOrderCard'
import React from 'react'

const NewOrderpage = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <NewOrderCard />
      <NewOrderCard />
      <NewOrderCard />
      <NewOrderCard />
      <NewOrderCard />
    </div>
  )
}
export default NewOrderpage
