export type SaleInfo = {
  title?: string
  amount?: string
  logo?: React.ReactNode
}

export type TCategoty = {
  title?: string
  amount?: string
}

export interface DropdownProps {
  items?: string[]
  onSelect?: (item: string) => void
}
