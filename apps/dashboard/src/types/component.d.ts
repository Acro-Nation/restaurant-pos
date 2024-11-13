interface TabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

interface TabContentProps {
  label: string
  children?: ReactNode
}

interface TabsProps {
  children?: ReactNode | ReactNode[]
  extraItems?: ReactNode[]
  title?: string
}

type Order = {
  dishName: string
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery'
  tableNo?: number
  amount: number
}
type NewOrder = {
  dishName: string
  amount: number
}
type OpenOrderDetails = {
  slNo: number
  customerName: string
  time: string
  totalOrderItems: number
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery'
  tableNo?: number
  status: string
}
