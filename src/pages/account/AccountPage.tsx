import { useAccountPage } from './useAccountPage'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react'

const STATUS_OPTIONS = ['PENDING', 'VERIFIED']

export default function AccountPage() {
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
  } = useAccountPage()

  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Account Management</h1>

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

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artist Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Creator Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No accounts found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {item.artist_name}
                  </TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.creator_type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'VERIFIED' ? 'default' : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
    </div>
  )
}
