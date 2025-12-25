import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-white text-gray-900 border shadow-lg rounded-lg p-4',
          description: 'text-gray-600 text-sm',
          actionButton: 'bg-primary text-white hover:bg-primary/90',
          cancelButton: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          success:
            '!bg-green-50 !text-green-900 !border-green-200 [&_svg]:!text-green-600',
          error:
            '!bg-red-50 !text-red-900 !border-red-200 [&_svg]:!text-red-600',
          warning:
            '!bg-yellow-50 !text-yellow-900 !border-yellow-200 [&_svg]:!text-yellow-600',
          info: '!bg-blue-50 !text-blue-900 !border-blue-200 [&_svg]:!text-blue-600',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
