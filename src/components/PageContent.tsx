import { cn } from '@/lib/utils'

export default function PageContent(props: IProps) {
  return (
    <div className={cn('py-6 grid gap-6', props.className)}>
      {props.children}
    </div>
  )
}

interface IProps {
  children: React.ReactNode
  className?: string
}
