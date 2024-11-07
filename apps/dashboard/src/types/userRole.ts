import { USER_ROLE } from '@/contant/role'
import { FC, SVGProps } from 'react'

export type userRole = keyof typeof USER_ROLE

export type DrawerItem = {
  title: string
  path: string
  parentPath?: string
  icon?: FC<SVGProps<SVGSVGElement>>
  child?: DrawerItem[]
}
