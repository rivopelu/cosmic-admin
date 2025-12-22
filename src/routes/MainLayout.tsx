import Sidebar from '@/components/Sidebar'
import type { PageLayoutType } from '@/types/types/type'
import type { ReactNode } from 'react'

export default function MainLayout({ children, type }: IProps) {
  switch (type) {
    case 'PRIMARY':
      return (
        <>
          <Sidebar />
          <div className="ml-sidebar">{children}</div>
        </>
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
