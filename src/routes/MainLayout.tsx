import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { PageLayoutType } from '@/types/types/type'
import type { ReactNode } from 'react'

export default function MainLayout({ children, type }: IProps) {
  switch (type) {
    case 'PRIMARY':
      return (
        <SidebarProvider>
          <AppSidebar />
          {children}
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
