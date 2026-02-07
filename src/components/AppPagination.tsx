import type {
  IPaginatedParams,
  IResPaginatedData,
} from '@/types/response/IResModel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import Pagination from './Pagination'
import { Card, CardContent } from './ui/card'

interface IProps {
  dataPagination?: IResPaginatedData
  onPaginationChange: (params: IPaginatedParams) => void
}

export default function AppPagination(props: IProps) {
  const handlePageChange = (page: number) => {
    props.onPaginationChange({
      page,
      size: props.dataPagination?.size || 10,
    })
  }

  const handleSizeChange = (size: number) => {
    props.onPaginationChange({
      page: 0,
      size,
    })
  }

  const totalPages = Math.ceil(
    (props.dataPagination?.total_data || 0) /
      (props.dataPagination?.size || 10),
  )

  // Hitung range data yang ditampilkan
  const currentPage = props.dataPagination?.page || 0
  const pageSize = props.dataPagination?.size || 10
  const totalData = props.dataPagination?.total_data || 0

  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalData)

  return (
    <Card className="shadow-none p-0">
      <CardContent className="p-4">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select
              value={props.dataPagination?.size?.toString() || '10'}
              onValueChange={(value) => handleSizeChange(parseInt(value))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">Rows per page</span>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <div className="text-sm text-muted-foreground">
            {totalData > 0 ? (
              <>
                Showing {startItem}-{endItem} of {totalData} items
              </>
            ) : (
              'No items to display'
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
