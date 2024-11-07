'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar'

import { drawerItems } from '@/utils/drawerItems'

import { DrawerItem } from '@/types/userRole'
import Image from 'next/image'
import logo from '../assets/Link 1.png'
import SidebarItems from './sidebarItems'
export function AppSidebar() {
  const roleBasedItems = drawerItems('admin')
  return (
    <Sidebar>
      <SidebarContent className="bg-white max-w-[280px]">
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
    </Sidebar>
  )
}
