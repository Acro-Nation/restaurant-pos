type SaleInfo = {
  title?: string
  amount?: string
  logo?: React.ReactNode
}

type TCategoty = {
  title?: string
  amount?: string
}
<<<<<<< HEAD
export type TProduct = {
  id: string
  title: string
  price: number
  description: string
}
export type TOrderItem = {
  id: string
  orderId: string
  productId: string
  quantity: number
=======

interface DropdownProps {
  items?: string[]
  onSelect?: (item: string) => void
>>>>>>> 7c4f9f8 (footer)
}
