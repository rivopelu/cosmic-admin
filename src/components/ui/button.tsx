import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent shadow-xs',
        ghost: 'bg-transparent',
        link: 'underline-offset-4 hover:underline',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      color: {
        default: '',
        destructive: '',
        success: '',
        info: '',
        warning: '',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        color: 'default',
        class:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      },
      {
        variant: 'solid',
        color: 'destructive',
        class:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 focus-visible:ring-[3px]',
      },
      {
        variant: 'solid',
        color: 'success',
        class:
          'bg-green-600 text-white hover:bg-green-600/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/80 focus-visible:ring-[3px]',
      },
      {
        variant: 'solid',
        color: 'info',
        class:
          'bg-blue-600 text-white hover:bg-blue-600/90 focus-visible:ring-blue-600/20 dark:focus-visible:ring-blue-600/40 dark:bg-blue-600/80 focus-visible:ring-[3px]',
      },
      {
        variant: 'solid',
        color: 'warning',
        class:
          'bg-yellow-500 text-white hover:bg-yellow-500/90 focus-visible:ring-yellow-500/20 dark:focus-visible:ring-yellow-500/40 dark:bg-yellow-500/80 focus-visible:ring-[3px]',
      },
      // Outline variants
      {
        variant: 'outline',
        color: 'default',
        class:
          'border-input text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      },
      {
        variant: 'outline',
        color: 'destructive',
        class:
          'border-destructive text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'outline',
        color: 'success',
        class:
          'border-green-600 text-green-600 hover:bg-green-600/10 focus-visible:ring-green-600/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'outline',
        color: 'info',
        class:
          'border-blue-600 text-blue-600 hover:bg-blue-600/10 focus-visible:ring-blue-600/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'outline',
        color: 'warning',
        class:
          'border-yellow-500 text-yellow-600 hover:bg-yellow-500/10 focus-visible:ring-yellow-500/20 focus-visible:ring-[3px]',
      },
      // Ghost variants
      {
        variant: 'ghost',
        color: 'default',
        class:
          'text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      },
      {
        variant: 'ghost',
        color: 'destructive',
        class:
          'text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'ghost',
        color: 'success',
        class:
          'text-green-600 hover:bg-green-600/10 hover:text-green-600 focus-visible:ring-green-600/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'ghost',
        color: 'info',
        class:
          'text-blue-600 hover:bg-blue-600/10 hover:text-blue-600 focus-visible:ring-blue-600/20 focus-visible:ring-[3px]',
      },
      {
        variant: 'ghost',
        color: 'warning',
        class:
          'text-yellow-600 hover:bg-yellow-500/10 hover:text-yellow-600 focus-visible:ring-yellow-500/20 focus-visible:ring-[3px]',
      },
      // Link variants
      {
        variant: 'link',
        color: 'default',
        class: 'text-primary',
      },
      {
        variant: 'link',
        color: 'destructive',
        class: 'text-destructive',
      },
      {
        variant: 'link',
        color: 'success',
        class: 'text-green-600',
      },
      {
        variant: 'link',
        color: 'info',
        class: 'text-blue-600',
      },
      {
        variant: 'link',
        color: 'warning',
        class: 'text-yellow-600',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'solid',
  color = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      disabled={loading || props.disabled}
      className={cn(
        'cursor-pointer',
        buttonVariants({ variant, color, size, className }),
      )}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
