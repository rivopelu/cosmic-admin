import { cn } from '@/lib/utils'

interface IProps {
  required?: boolean
  label: string
  htmlFor?: string
  className?: string
}

export default function Label(props: IProps) {
  return (
    <label
      htmlFor={props.htmlFor}
      className={cn('mb-1 text-sm font-medium  text-gray-700', props.className)}
    >
      {props.label}
      {props.required && <span className={'text-red-700'}> *</span>}
    </label>
  )
}
