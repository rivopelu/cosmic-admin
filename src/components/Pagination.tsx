import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pageNumbers = []

    pageNumbers.push(0)

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 2, startPage + maxVisiblePages - 3)

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 3))
    }

    if (startPage > 1) {
      pageNumbers.push(-1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (endPage < totalPages - 2) {
      pageNumbers.push(-2) // -2 represents ellipsis
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pageNumbers.map((pageNumber, index) => {
        // Render ellipsis
        if (pageNumber < 0) {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )
        }

        // Render page number
        return (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? 'solid' : 'outline'}
            size="icon"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber + 1}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
