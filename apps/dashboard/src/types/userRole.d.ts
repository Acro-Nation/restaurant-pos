type userRole = keyof typeof USER_ROLE

type DrawerItem = {
  title: string
  path: string
  parentPath?: string
  icon?: FC<SVGProps<SVGSVGElement>>
  child?: DrawerItem[]
}

type IDrawerProps = {
  item: DrawerItem
}
