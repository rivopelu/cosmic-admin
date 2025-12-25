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
      return <ArrowUpDown className="h-4 w-4" />
    }

    return parsedSort?.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
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
        <div className="rounded-sm border-gray-200 bg-white  overflow-hidden">
          <Table disableBorder={disableBorder}>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-50 hover:to-gray-100 border-b-2 border-gray-200">
                {column.map((header, i) => (
                  <TableHead
                    className={cn(
                      'text-xs font-semibold uppercase tracking-wide text-gray-700 py-4',
                      i === 0 && 'pl-6',
                      i === column.length - 1 && 'pr-6',
                      header.sortParam &&
                        'cursor-pointer select-none hover:text-primary transition-colors',
                    )}
                    key={i}
                    onClick={() => handleHeaderClick(header.sortParam)}
                  >
                    <div className="flex items-center gap-2">
                      {header.headerTitle}
                      {header.sortParam && (
                        <span
                          className={cn(
                            'transition-colors',
                            parsedSort?.field === header.sortParam
                              ? 'text-primary'
                              : 'text-gray-400',
                          )}
                        >
                          {getSortIcon(header.sortParam)}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <TableRow
                      key={`loading-${i}`}
                      className="border-b border-gray-100"
                    >
                      {column.map((_, idx) => (
                        <TableCell
                          key={idx}
                          className={cn(
                            'py-4',
                            idx === 0 && 'pl-6',
                            idx === column.length - 1 && 'pr-6',
                          )}
                        >
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : data.map((row, i) => (
                    <TableRow
                      key={i}
                      className="border-b border-gray-100 hover:bg-primary/5 transition-colors"
                    >
                      {column.map((s, idx) => (
                        <TableCell
                          key={idx}
                          className={cn(
                            'py-4 text-sm text-gray-900',
                            idx === 0 && 'pl-6 font-medium',
                            idx === column.length - 1 && 'pr-6',
                          )}
                        >
                          {s.component && s.component(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
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
