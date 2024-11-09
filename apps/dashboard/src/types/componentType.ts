export type SaleInfo = {
  title?: string
  amount?: string
  logo?: React.ReactNode
}

export type TCategoty = {
  title?: string
  amount?: string
}
export type TProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
};
export type TOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
};
