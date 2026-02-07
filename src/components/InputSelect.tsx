'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import {
  getIn,
  useFormikContext,
  type FormikErrors,
  type FormikTouched,
} from 'formik'
import Label from './Label'

interface IProps {
  id?: string
  label?: string
  required?: boolean
  placeholder?: string
  options: IResLabelValue<any>[]
  name: string
  value?: any
  onChange?: (value: any) => void
  helperText?: string
  errorMessage?: string
  alignment?: 'horizontal' | 'vertical'
  disabled?: boolean
  className?: string
}

export default function InputSelect(props: IProps) {
  const alignment = props.alignment || 'vertical'
  const formik = useFormikContext<any>()
  const [open, setOpen] = React.useState(false)

  const errors = formik?.errors as FormikErrors<Record<string, any>>
  const touched = formik?.touched as FormikTouched<Record<string, any>>

  const errorMessage =
    props.errorMessage ??
    (getIn(touched, props.name) && getIn(errors, props.name)
      ? getIn(errors, props.name)
      : '')

  const currentValue = props.value ?? getIn(formik?.values, props.name)

  const selectedOption = props.options.find(
    (option) => option.value === currentValue,
  )

  const handleSelect = (val: any) => {
    const newValue = val === currentValue ? undefined : val
    if (props.onChange) {
      props.onChange(newValue)
    } else if (formik) {
      formik.setFieldValue(props.name, newValue)
    }
    setOpen(false)
  }

  return (
    <div
      className={cn(
        'grid gap-1',
        alignment === 'horizontal' ? 'grid-cols-2 items-center' : '',
        props.className,
      )}
    >
      {props.label && (
        <Label
          className="flex items-center"
          label={props.label}
          required={props.required}
        />
      )}
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={props.disabled}
              className={cn(
                'w-full justify-between font-normal bg-background dark:bg-card',
                !selectedOption && 'text-muted-foreground',
                errorMessage ? 'outline-red-500 border-red-500 bg-red-50' : '',
              )}
            >
              {selectedOption
                ? selectedOption.label
                : props.placeholder || 'Pilih opsi...'}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder={props.placeholder || 'Cari...'} />
              <CommandList>
                <CommandEmpty>Opsi tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {props.options.map((option) => (
                    <CommandItem
                      key={String(option.value)}
                      value={String(option.label)}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          currentValue === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {(errorMessage || props.helperText) && (
          <p
            className={cn(
              'text-xs mt-1',
              errorMessage ? 'text-red-500' : 'text-gray-500',
            )}
          >
            {errorMessage || props.helperText}
          </p>
        )}
      </div>
    </div>
  )
}
