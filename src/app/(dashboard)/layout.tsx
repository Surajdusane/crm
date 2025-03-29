import { SmartBreadcrumb } from "@/components/global/smart-breadcrumb"
import { AppSidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        <div className="bg-background sm:border-t-2 border-muted-foregroundforeground sm:p-4 sm:border-l-2 rounded-tl-xl sm:shadow-2xl mt-4">
          <div className="flex justify-start items-center gap-2 pb-4">
          <SidebarTrigger />
          <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
          <SmartBreadcrumb />
          </div>
        {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
