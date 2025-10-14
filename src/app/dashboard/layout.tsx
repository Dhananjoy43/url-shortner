import { LayoutProps } from "@/types";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Banner } from "@/components/global/banner";
import { DialogProvider } from "@/components/providers/dialog-provider";
import { DashboardSidebar } from "@/components/sidebar/dashboard-sidebar";

export default function AdminDashboardLayout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="bg-background/60 sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b shadow-xs backdrop-blur-lg transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-1 px-2 md:px-4">
            <SidebarTrigger className="-ml-1" />

            <div className="flex items-end sm:hidden">
              <span className="font-brunoAceSc text-primary truncate text-2xl leading-6 font-bold">
                Shortly
              </span>
            </div>
          </div>
        </header>
        <main className="space-y-4 p-2 md:p-4">
          <Banner />
          {children}
          <DialogProvider />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
