import { AppSidebar } from '@/components/AppSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import type { PageLayoutType } from '@/types/types/type'
import type { ReactNode } from 'react'

export default function MainLayout({ children, type }: IProps) {
  switch (type) {
    case 'PRIMARY':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      )
    case 'FULL_SCREEN':
      return <>{children}</>
    default:
      ;<>{children}</>
  }
}

interface IProps {
  children: ReactNode
  type: PageLayoutType
}
