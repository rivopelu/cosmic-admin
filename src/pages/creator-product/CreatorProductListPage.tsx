import AppPagination from '@/components/AppPagination'
import type { ITableColumn } from '@/components/AppTable'
import AppTable from '@/components/AppTable'
import FilterList from '@/components/FilterList'
import InputSearch from '@/components/InputSearch'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { IResCreatorProduct } from '@/types/response/IResCreatorProduct'
import { formatCurrency } from '@/utils/currency-helper'
import DateHelper from '@/utils/date-helper'
import { InfoIcon } from 'lucide-react'
import { useCreatorProductListPage } from './useCreatorProductListPage'
import { Link } from '@tanstack/react-router'

export default function CreatorProductListPage() {
  const page = useCreatorProductListPage()

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'default'
      case 'PENDING':
        return 'secondary'
      case 'REJECTED':
        return 'destructive'
      case 'DRAFT':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const tableColumn: Array<ITableColumn<IResCreatorProduct>> = [
    {
      headerTitle: 'Product',
      component: (data: IResCreatorProduct) => (
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={data.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{data.name}</div>
            <div className="text-xs text-gray-500">{data.creator_name}</div>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Category',
      component: (data: IResCreatorProduct) => (
        <div className="text-gray-700">{data.category_name}</div>
      ),
    },
    {
      headerTitle: 'Price',
      sortParam: 'price',
      component: (data: IResCreatorProduct) => (
        <div className="font-semibold text-gray-900">
          {formatCurrency(data.price)}
        </div>
      ),
    },
    {
      headerTitle: 'Status',
      component: (data: IResCreatorProduct) => (
        <Badge variant={getStatusVariant(data.status)}>{data.status}</Badge>
      ),
    },
    {
      headerTitle: 'Created Date',
      sortParam: 'createdDate',
      component: (data: IResCreatorProduct) => (
        <div className="text-gray-600">
          {DateHelper.toFormatDate(data.created_date, 'MMM dd, yyyy')}
          <div className="text-xs text-gray-400">
            {DateHelper.toFormatDate(data.created_date, 'HH:mm:ss')}
          </div>
        </div>
      ),
    },

    {
      headerTitle: 'Updated Date',
      sortParam: 'updatedDate',
      component: (data: IResCreatorProduct) => (
        <div className="text-gray-600">
          {DateHelper.toFormatDate(data.updated_date, 'MMM dd, yyyy')}
          <div className="text-xs text-gray-400">
            {DateHelper.toFormatDate(data.updated_date, 'HH:mm:ss')}
          </div>
        </div>
      ),
    },
    {
      headerTitle: '',
      component: (data: IResCreatorProduct) => (
        <Link to={ROUTES.CREATOR_PRODUCT_DETAIL(data.parent_id)}>
          <Button variant="outline" size={'icon'}>
            <InfoIcon />
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <PageContent>
      {/* Page Header */}
      <div className="mb-6">
        <PageTitle
          title="Creator Product Management"
          description="Manage and monitor all creator products in the system"
        />
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center gap-4">
        <InputSearch
          handleSearch={page.handleSearch}
          searchValue={page.searchValue}
          setSearchValue={page.setSearchValue}
          placeholder="Search by product name or creator..."
          active={!!page.searchValue}
          handleReset={page.handleResetSearch}
        />
        <FilterList
          active={!!page.activeFilter}
          open={page.openFilter}
          onOpenChange={page.setOpenFilter}
          onReset={page.handleResetSearch}
          onSubmit={() => {
            const form = document.getElementById(
              'filter-form',
            ) as HTMLFormElement
            form?.requestSubmit()
          }}
        >
          {/* TODO: Add filter form with status and category filters */}
          <div className="p-4 text-sm text-gray-500">
            Filters will be added here (Status, Category)
          </div>
        </FilterList>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <AppTable
          data={page?.dataList || []}
          column={tableColumn}
          loading={page?.queryList.isLoading}
          onSort={page.handleSort}
          currentSort={page.search?.sort}
        />
        <AppPagination
          dataPagination={page.queryList?.data?.paginated_data}
          onPaginationChange={(e) => page.handlePaginationChange(e)}
        />
      </div>
    </PageContent>
  )
}
