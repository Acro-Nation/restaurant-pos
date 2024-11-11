'use client'

import Image from 'next/image'
import logo from '../assets/Link 1.png'
import SidebarItems from './sidebarItems'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,

} from './atoms/sidebar'
import { drawerItems, footerItems } from '@/utils/drawerItems'

export function AppSidebar() {
  const roleBasedItems = drawerItems('admin')

  return (
    <Sidebar>
      <SidebarContent className="max-w-[280px] bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="h-[74px]">
            <Image
              src={logo}
              height={60}
              width={60}
              alt="logo"
              className="h-auto"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleBasedItems.map((item: DrawerItem) => (
                <SidebarItems item={item} key={item.title} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white">
        <SidebarMenu>
          {footerItems.map((item: DrawerItem) => (
            <SidebarItems item={item} key={item.title} />
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
