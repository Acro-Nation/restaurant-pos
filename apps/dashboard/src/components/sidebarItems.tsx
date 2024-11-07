import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { DrawerItem } from '@/types/userRole'
import { usePathname } from 'next/navigation'

type IProps = {
  item: DrawerItem
}
const SidebarItems = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`
  const pathName = usePathname()

  return (
    <SidebarMenuItem className="bg-white w-[232px] mx-auto rounded-md">
      <SidebarMenuButton
        asChild
        className={`${pathName === linkPath ? 'bg-[#00897B] text-white hover:bg-[#00897B] hover:text-white' : ''} my-1`}
      >
        <Link href={linkPath}>
          {/* {item.icon ? <item.icon /> : 'Icon'} */}
          {item.icon ? item.icon : ''}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarItems
