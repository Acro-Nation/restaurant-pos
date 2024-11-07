import { USER_ROLE } from '@/contant/role'

export type userRole = keyof typeof USER_ROLE

export type DrawerItem = {
  title: string
  path: string
  parentPath?: string
  icon?: string
  child?: DrawerItem[]
}