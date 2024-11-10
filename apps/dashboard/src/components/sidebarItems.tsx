import { IDrawerProps } from '@/types/userRole'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { SidebarMenuButton, SidebarMenuItem } from './atoms/sidebar'

const SidebarItems = ({ item }: IDrawerProps) => {
  const linkPath = `/dashboard/${item.path}`
  const pathName = usePathname()
  const isActive = pathName === linkPath
  return (
    <SidebarMenuItem className="bg-white w-[232px] mx-auto rounded-md">
      <SidebarMenuButton
        asChild
        className={`${pathName === linkPath ? 'bg-[#00897B] text-white hover:bg-[#00897B] hover:text-white' : ''} my-1`}
      >
        <Link href={linkPath}>
          <div className="size-[2rem]  flex items-center justify-center">
            {item.icon ? <item.icon fill={isActive ? 'white' : ''} /> : null}
          </div>

          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarItems
