import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'
import NewOrderCard from './features/newOrderCard/newOrderCard'
import OpenOrderCard from './features/openOrder/openOrderCard'
import Salestabs from './features/sales/salesTabs/salestabs'

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-5 bg-[#F5F5F5]">
      <h1>Hello World </h1>

      <ReuseIcon bgColor="black" />

      <NewOrderCard />
      <OpenOrderCard />
      <Salestabs />
    </div>
  )
}
