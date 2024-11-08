import { AppSidebar } from '@/components/app-sidebar'
import Tabs from '@/components/atoms/pageTabs'
import AppBar from '@/components/common/appbar'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full">
        <AppBar />
        <Tabs />
        <SidebarTrigger />

        <div className="bg-[#F5F5F5] h-auto p-6 min-h-[100vh]">{children}</div>
      </div>
    </SidebarProvider>
  )
}
