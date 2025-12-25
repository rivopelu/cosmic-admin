import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import { useCreatorListPage } from './useCreatorListPage'
import type { ITableColumn } from '@/components/AppTable'
import type { IResCreatorList } from '@/types/response/IResCreatorList'
import AppTable from '@/components/AppTable'
import PageTitle from '@/components/PageTitle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ROUTES } from '@/constants/routes'
import PageContent from '@/components/PageContent'

const STATUS_OPTIONS = ['PENDING', 'VERIFIED']

export default function CreatorListPage() {
  const {
    data,
    pagination,
    isLoading,
    search,
    setSearch,
    status,
    toggleStatus,
    page,
    setPage,
    size,
    setSize,
  } = useCreatorListPage()

  const tableColumn: Array<ITableColumn<IResCreatorList>> = [
    {
      headerTitle: 'Artist Name',
      component: (data: IResCreatorList) => data.artist_name,
    },
    {
      headerTitle: 'Username',
      component: (data: IResCreatorList) => data.username,
    },
    {
      headerTitle: 'Creator Type',
      component: (data: IResCreatorList) => data.creator_type,
    },
    {
      headerTitle: 'Status',
      component: (data: IResCreatorList) => (
        <Badge variant={data.status === 'VERIFIED' ? 'default' : 'secondary'}>
          {data.status}
        </Badge>
      ),
    },
  ]

  return (
    <PageContent>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Creator List"
          breadcrumb={[{ path: ROUTES.CREATOR_LIST(), label: 'Creator List' }]}
        />

        <div className="flex items-center gap-2">
          {STATUS_OPTIONS.map((s) => (
            <Badge
              key={s}
              variant={status.includes(s) ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1"
              onClick={() => toggleStatus(s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search account..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Options</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {/* Additional filters can go here */}
              <p className="text-sm text-muted-foreground">
                More filter options coming soon...
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AppTable data={data} column={tableColumn} loading={isLoading} />

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={size.toString()}
            onValueChange={(val) => setSize(Number(val))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {page + 1} of {pagination?.page_count || 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => setPage(page + 1)}
              disabled={page + 1 >= (pagination?.page_count || 1)}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </PageContent>
  )
}
