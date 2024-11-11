type SaleInfo = {
  title?: string
  amount?: string
  logo?: React.ReactNode
}

type TCategoty = {
  title?: string
  amount?: string
}

interface DropdownProps {
  items?: string[]
  onSelect?: (item: string) => void
}
