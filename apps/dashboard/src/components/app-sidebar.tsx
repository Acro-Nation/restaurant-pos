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
import SidebarItems from './sidebarItems'
import { DrawerItem } from '@/types/userRole'

export function AppSidebar() {
  const roleBasedItems = drawerItems('admin')
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
