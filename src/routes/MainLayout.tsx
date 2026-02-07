import { AppSidebar } from '@/components/AppSidebar'
import PageContainer from '@/components/PageContainer'
import TopBar from '@/components/TopBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { PageLayoutType } from '@/types/types/type'
import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'

export default function MainLayout({ children, type }: IProps) {
  function checking() {
    switch (type) {
      case 'PRIMARY':
        return (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background overflow-hidden">
              <TopBar />
              <div className="flex-1 overflow-y-auto p-4 pt-0">
                <PageContainer>{children}</PageContainer>
              </div>
            </SidebarInset>
          </SidebarProvider>
        )
      case 'FULL_SCREEN':
        return <>{children}</>
      default:
        ;<>{children}</>
    }
  }
  return (
    <main className="bg-slate-50">
      <Toaster />
      {checking()}
    </main>
  )
}

interface IProps {
  children: ReactNode
  type: PageLayoutType
}
