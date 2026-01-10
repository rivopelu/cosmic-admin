import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'
import {
  type FormikErrors,
  type FormikTouched,
  getIn,
  useFormikContext,
} from 'formik'
import { Textarea } from '@/components/ui/textarea.tsx'
import Label from './Label'

interface IProps {
  id?: string
  label?: string
  required?: boolean
  placeholder?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  errorMessage?: any
  helperText?: string
  name: string
  value?: string
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  dataTestId?: string
  alignment?: 'horizontal' | 'vertical'
  rows?: number
  maxLength?: number
}

export default function InputTextArea(props: IProps) {
  const alignment = props.alignment || 'vertical'
  const formik = useFormikContext<any>()

  const errors = formik?.errors as FormikErrors<Record<string, any>>
  const touched = formik?.touched as FormikTouched<Record<string, any>>

  const errorMessage =
    props.errorMessage ??
    (getIn(touched, props.name) && getIn(errors, props.name)
      ? getIn(errors, props.name)
      : '')
  return (
    <div
      className={cn('grid', alignment === 'horizontal' ? 'grid-cols-2' : '')}
    >
      {props.label && (
        <Label
          className="flex items-center"
          label={props.label}
          required={props.required}
        />
      )}
      <div>
        <div className={cn('relative flex dark:bg-card bg-white')}>
          {props.startIcon && (
            <span className="absolute text-gray-500 left-3 top-3 flex items-center pr-3">
              {props.startIcon}
            </span>
          )}
          <Textarea
            data-testid={props.dataTestId}
            onBlur={props.onBlur ?? formik?.handleBlur}
            onChange={props.onChange ?? formik?.handleChange}
            value={props.value ?? getIn(formik?.values, props.name) ?? ''}
            name={props.name}
            placeholder={props.placeholder || ''}
            rows={props.rows || 4}
            maxLength={props.maxLength}
            className={cn(
              props.startIcon ? 'pl-12' : '',
              props.endIcon ? 'pr-9' : '',
              errorMessage ? ' outline-red-500 border-red-500 bg-red-100' : '',
            )}
            id={props.id}
          />
          {props.endIcon && (
            <span className="absolute text-gray-500 right-3 top-3 flex items-center pl-3">
              {props.endIcon}
            </span>
          )}
        </div>
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
