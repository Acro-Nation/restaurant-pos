import { ReactNode } from 'react'

export interface TabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export interface TabContentProps {
  label: string
  children?: ReactNode
}

export interface TabsProps {
  children?: ReactNode | ReactNode[]
  extraItems?: ReactNode[]
  title?: string
}
