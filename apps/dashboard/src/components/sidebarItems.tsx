"use client"
import {

  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { DrawerItem } from '@/types/userRole'
import { usePathname } from 'next/navigation'

type IProps ={
    item:DrawerItem,
    
}
const SidebarItems = ({item}:IProps) => {
  const linkPath = `/dashboard/${item.path}`
  const pathName = usePathname()


  return (
    <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${pathName === linkPath ? "bg-[#00897B] text-white hover:bg-[#00897B]" : ""}`}>
                    <Link href={linkPath}>
                      {item.icon ? <item.icon /> : 'Icon'}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
  )
}

export default SidebarItems
