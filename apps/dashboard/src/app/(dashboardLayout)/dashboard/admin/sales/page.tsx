
import SalesCard1 from '@/app/features/sales/salesCard/salesCard1'
import SalesCard2 from '@/app/features/sales/salesCard/salesCard2'
import SalesCard3 from '@/app/features/sales/salesCard/salesCard3'
import Salestabs from '@/app/features/sales/salesTabs/salestabs'
import CategoryIcon from '@/assets/icons/CategoryIcon'

import React from 'react'

const SalesPage = () => {
  return (
   <div>
     <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <Salestabs title={'New Order'} logo={<CategoryIcon />} amount={'12000'} />
      <Salestabs title={'New Order'} logo={<CategoryIcon />} amount={'12000'} />
      <Salestabs title={'New Order'} logo={<CategoryIcon />} amount={'12000'} />
      <Salestabs title={'New Order'} logo={<CategoryIcon />} amount={'12000'} />
      <Salestabs title={'New Order'} logo={<CategoryIcon />} amount={'12000'} />
    </div>
    <div className='grid grid-cols-3 gap-3 mt-5'>
      <SalesCard1/>
    <SalesCard2/>
    <SalesCard3/>
    </div>
   </div>
  )
}

export default SalesPage
