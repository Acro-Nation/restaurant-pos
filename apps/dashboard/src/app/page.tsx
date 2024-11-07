import ReuseIcon from './compo/reuseIcon/reuseIcon'
import NewOrderCard from './compo/newOrderCard/newOrderCard'
import { BiMinus } from 'react-icons/bi'
import OpenOrderCard from './compo/openOrder/openOrderCard'
import Salestabs from './compo/salesTabs/salestabs'
import CategoryCard from './compo/category/categoryCard'

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-5 bg-[#F5F5F5]">
      <h1>Hello World </h1>
      {testin}
      <ReuseIcon
        bgColor="black"
        icon={<BiMinus strokeWidth={3} color="white" />}
      />
      <NewOrderCard />
      <OpenOrderCard />
      <Salestabs />
      <CategoryCard />
    </div>
  )
}
