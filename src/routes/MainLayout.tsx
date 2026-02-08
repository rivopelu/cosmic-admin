import { AppSidebar } from '@/components/AppSidebar'
import PageContainer from '@/components/PageContainer'
import TopBar from '@/components/TopBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { PageLayoutType } from '@/types/types/type'
import { useLocation } from '@tanstack/react-router'
import { type ReactNode, useEffect, useRef } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { ASSETS } from '@/constants/assets'

export default function MainLayout({ children, type }: IProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [pathname])

  function checking() {
    switch (type) {
      case 'PRIMARY':
        return (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
              <TopBar />
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-0">
                <PageContainer>{children}</PageContainer>
              </div>
            </SidebarInset>
          </SidebarProvider>
        )
      case 'FULL_SCREEN':
        return <>{children}</>
      default:
        return <>{children}</>
    }
  }
  return (
    <main
      className="bg-cover bg-fixed"
      style={{ backgroundImage: `url(${ASSETS.BG})` }}
    >
      <Toaster />
      {checking()}
    </main>
  )
}

interface IProps {
  children: ReactNode
  type: PageLayoutType
}
