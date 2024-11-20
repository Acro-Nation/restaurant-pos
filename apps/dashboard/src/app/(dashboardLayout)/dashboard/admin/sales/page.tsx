import SalesCard1 from '@/app/features/sales/salesCard/salesCard1'
import SalesCard2 from '@/app/features/sales/salesCard/salesCard2'
import SalesCard3 from '@/app/features/sales/salesCard/salesCard3'
import Salestabs from '@/app/features/sales/salesTabs/salestabs'
import CategoryIcon from '@/assets/icons/CategoryIcon'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'
import LineChartComponent from '@/components/molecules/Charts/AreaChart'
import BarChartComponent from '@/components/molecules/Charts/BarChart'
import Tabs, { TabContent } from '@/components/molecules/Tabs/Tabs'

import React from 'react'

const SalesPage = () => {
  return (   
    <Tabs
     title="Sales"
    extraItems={[
      <div
        key={1}
        className="px-4 py-2 flex justify-center items-center gap-2"
      >
        <ReuseIcon bgColor="#4BBF74" size={7} />
        <span>Available</span>
      </div>,
      <div
        key={2}
        className="px-4 py-2 flex justify-center items-center gap-2"
      >
        <ReuseIcon bgColor="#FF8800" size={7} />
        <span>In progress</span>
      </div>,
    ]}
   
  >
    <TabContent label="Daily">
    <div>
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
       <Salestabs
          title={'New Order'}
          logo={<CategoryIcon />}
          amount={'12000'}
        />
    
      </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 mt-5">
     <SalesCard1 />
       <SalesCard2 />
         <SalesCard3 />
      </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
        <LineChartComponent />
        <BarChartComponent/>
      </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
        <LineChartComponent />
        <BarChartComponent/>
      </div>

  </div>
 
    </TabContent>

    <TabContent label="Weekly">
      <div className="grid lg:grid-cols-6 gap-2">
       2
      </div>
    </TabContent>
    <TabContent label="Monthly">
      <div className="grid lg:grid-cols-6 gap-2">
       3
      </div>
    </TabContent>
  </Tabs>
  )
}

export default SalesPage
