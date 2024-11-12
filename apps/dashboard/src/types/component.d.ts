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
