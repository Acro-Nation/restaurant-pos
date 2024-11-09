import { AppSidebar } from '@/components/app-sidebar'
import AppBar from '@/components/common/appbar'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-full">
        <AppBar />

        <div className="bg-[#F5F5F5] h-auto min-h-[100vh]">{children}</div>
      </div>
    </SidebarProvider>
  )
}
