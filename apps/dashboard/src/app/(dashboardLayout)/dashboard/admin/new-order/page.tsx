import NewOrderCard from '@/app/features/newOrderCard/newOrderCard'
import ReuseIcon from '@/components/common/reuseIcon/reuseIcon'
import Dropdown from '@/components/molecules/PaymentDropDown/PaymentDropDown'
import Tabs from '@/components/molecules/Tabs/Tabs'

const NewOrderpage = () => {
  return (
    <>
      <Tabs
        title="New Order"
        extraItems={[
          <div key={1} className="px-4 py-2">
            <ReuseIcon bgColor="#4BBF74" size={7} />
          </div>,
          <div key={2}>
            <Dropdown />
          </div>,
        ]}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 p-4">
        <NewOrderCard />
        <NewOrderCard />
        <NewOrderCard />
        <NewOrderCard />
        <NewOrderCard />
      </div>
    </>
  )
}
export default NewOrderpage
