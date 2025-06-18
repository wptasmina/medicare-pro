import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Medicare Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Doctor Panel</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
       <h2 className="text-green-400 text-3xl pl-4 font-bole py-6 rounded-xl">Summary</h2>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-2 bg-purple-100 aspect-video rounded-xl">
              <h2 className="text-black text-xl font-medium py-1 rounded-xl">Assistants</h2>
              <p className="text-green-400 text-3xl font-medium">2</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-green-50 aspect-video rounded-xl">
              <h2 className="text-black text-xl font-medium py-1 rounded-xl">Subscription plan</h2>
              <p className="text-green-400 text-2xl font-medium">Free</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-red-50 aspect-video rounded-xl">
              <h2 className="text-black text-xl font-medium py-1 rounded-xl">Status</h2>
              <p className="text-green-400 text-2xl font-medium">Active</p>
            </div>
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
