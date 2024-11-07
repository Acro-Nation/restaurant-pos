import ReuseIcon from './compo/reuseIcon/reuseIcon'
import NewOrderCard from './compo/newOrderCard/newOrderCard'
import OpenOrderCard from './compo/openOrder/openOrderCard'
import Salestabs from './compo/salesTabs/salestabs'
import CategoryCard from './compo/category/categoryCard'

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-5 bg-[#F5F5F5]">
      <h1>Hello World </h1>
<<<<<<< HEAD
      {testin}
      <ReuseIcon
        bgColor="black"
        
      />
=======

      <ReuseIcon bgColor="black" />
>>>>>>> 90bd71a (dashboard)
      <NewOrderCard />
      <OpenOrderCard />
      <Salestabs />
      <CategoryCard />
    </div>
  )
}
