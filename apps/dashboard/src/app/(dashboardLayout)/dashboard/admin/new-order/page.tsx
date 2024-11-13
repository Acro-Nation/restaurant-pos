import NewOrderCard from '@/app/features/newOrderCard/newOrderCard'
import Dropdown from '@/components/molecules/PaymentDropDown/PaymentDropDown'
import Tabs from '@/components/molecules/Tabs/Tabs'

const NewOrderpage = () => {
  return (
    <div className="h-[200vh]">
      <Tabs
        title="New Order"
        extraItems={[
          <div key={1}>
            <Dropdown />
          </div>,
        ]}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4">
        <NewOrderCard dishName="Sandwich" amount={100} />
      </div>
    </div>
  )
}
export default NewOrderpage
