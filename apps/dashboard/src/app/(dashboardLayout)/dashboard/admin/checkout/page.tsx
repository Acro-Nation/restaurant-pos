import CheckoutDetails from '@/app/features/checkout/checkoutDetails'
import { CheckoutItem } from '@/app/features/checkout/checkoutItem'
import { Button } from '@/components/atoms/button'
import Tabs, { TabContent } from '@/components/molecules/Tabs/Tabs'

const CheckoutPage = () => {
  return (
    <div>
      <Tabs
        extraItems={[
          <div
            key={1}
            className="px-4 py-2 flex justify-center items-center gap-2"
          >
            <Button className="bg-black">Offer</Button>
          </div>,
        ]}
        title="Checkout  all Product"
      >
        <TabContent label="Dine-In">
          <div className="flex flex-col space-y-11">
            <CheckoutItem />
            <CheckoutDetails />
          </div>
        </TabContent>
      </Tabs>

      <div className="flex justify-end gap-4 px-4 py-2 mx-2">
        <Button className="bg-[#FF8800]">Kitchen Print</Button>
        <Button>Generate Bill</Button>
        <Button className="bg-black">Send Queue</Button>
      </div>
    </div>
  )
}

export default CheckoutPage
