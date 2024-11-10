import TkIcon from '@/assets/icons/TkIcon'

const PaymentSubtotal = () => {
  return (
    <div className="max-w-[434px]  border p-4 flex flex-col gap-11 rounded-lg bg-white">
      <div className="space-y-2 p-2">
        <div className="flex justify-between">
          <span className="text-[20px]">Subtotal</span>

          <div className="flex items-center">
            <TkIcon fill="#00897B" />
            <span>12000</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-[20px]">Taxs</span>

          <div className="flex items-center">
            <TkIcon fill="#00897B" />
            <span>12000</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-[20px]">Net Sales</span>

          <div className="flex items-center">
            <TkIcon fill="#00897B" />
            <span>12000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSubtotal
