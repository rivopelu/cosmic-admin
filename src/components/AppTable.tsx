import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { Skeleton } from './ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import CardEmpty from './CardEmpty'

export default function AppTable(props: IProps) {
  const { data, column, disableBorder, loading } = props

  return (
    <>
      {!loading && data.length === 0 ? (
        <CardEmpty />
      ) : (
        <Table className="bg-white" disableBorder={disableBorder}>
          <TableHeader className="bg-white">
            <TableRow>
              {column.map((header, i) => (
                <TableHead
                  className={cn(
                    'text-start py-3 font-semibold uppercase',
                    i === 0 && 'pl-4',
                  )}
                  key={i}
                >
                  {header.headerTitle}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={`loading-${i}`}>
                    {column.map((_, idx) => (
                      <TableCell
                        key={idx}
                        className={cn('py-3', idx === 0 && 'pl-4', 'border-b')}
                      >
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((row, i) => (
                  <TableRow key={i}>
                    {column.map((column, idx) => (
                      <TableCell
                        key={idx}
                        className={cn('py-3', idx === 0 && 'pl-4', 'border-b')}
                      >
                        {column.component && column.component(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

interface IProps {
  data: any[]
  column: ITableColumn<any>[]
  disableBorder?: boolean
  loading?: boolean
}

export interface ITableColumn<T> {
  headerTitle?: string
  component?: (data: T) => ReactNode
}
