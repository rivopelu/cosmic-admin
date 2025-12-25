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
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

export default function AppTable(props: IProps) {
  const { data, column, disableBorder, loading, onSort, currentSort } = props

  // Parse current sort: "field_name,asc" or "field_name,desc"
  const parsedSort = currentSort
    ? { field: currentSort.split(',')[0], direction: currentSort.split(',')[1] }
    : null

  const getSortIcon = (sortParam?: string) => {
    if (!sortParam) return null

    const isActive = parsedSort?.field === sortParam
    if (!isActive) {
      return <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
    }

    return parsedSort?.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 inline-block" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 inline-block" />
    )
  }

  const handleHeaderClick = (sortParam?: string) => {
    if (!sortParam || !onSort) return
    onSort(sortParam)
  }

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
                    header.sortParam &&
                      'cursor-pointer select-none hover:bg-gray-50',
                  )}
                  key={i}
                  onClick={() => handleHeaderClick(header.sortParam)}
                >
                  {header.headerTitle}
                  {getSortIcon(header.sortParam)}
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
  onSort?: (sortParam: string) => void
  currentSort?: string
}

export interface ITableColumn<T> {
  headerTitle?: string
  component?: (data: T) => ReactNode
  sortParam?: string
}
