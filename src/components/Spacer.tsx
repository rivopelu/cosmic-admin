import { cn } from '@/lib/utils'

interface IProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  orientation?: 'vertical' | 'horizontal'
}

export default function Spacer({
  size = 'md',
  orientation = 'vertical',
  className,
}: IProps) {
  const sizeMap = {
    sm: orientation === 'vertical' ? 'h-2' : 'w-2',
    md: orientation === 'vertical' ? 'h-4' : 'w-4',
    lg: orientation === 'vertical' ? 'h-6' : 'w-6',
  }

  return <div className={cn(sizeMap[size], className)}></div>
}
