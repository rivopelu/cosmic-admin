import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export default function PageContainer({ children, className }: IProps) {
  return (
    <section className={cn(className, 'w-full px-10 mx-auto')}>
      {children}
    </section>
  )
}
interface IProps {
  children: ReactNode
  className?: string
}
