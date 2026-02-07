import AppPagination from '@/components/AppPagination'
import type { ITableColumn } from '@/components/AppTable'
import AppTable from '@/components/AppTable'
import FilterList from '@/components/FilterList'
import InputSearch from '@/components/InputSearch'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import CreatorProductStatusText from '@/components/creator-product/CreatorProductStatusText'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { IResCreatorProduct } from '@/types/response/IResCreatorProduct'
import { formatCurrency } from '@/utils/currency-helper'
import DateHelper from '@/utils/date-helper'
import { Link } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'
import { useCreatorProductListPage } from './useCreatorProductListPage'

export default function CreatorProductListPage() {
  const page = useCreatorProductListPage()

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
            <div className="font-semibold text-foreground">{data.name}</div>
            <div className="text-xs text-muted-foreground">
              {data.creator_name}
            </div>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Category',
      component: (data: IResCreatorProduct) => (
        <div className="text-muted-foreground">{data.category_name}</div>
      ),
    },
    {
      headerTitle: 'Price',
      sortParam: 'price',
      component: (data: IResCreatorProduct) => (
        <div className="font-semibold text-foreground">
          {formatCurrency(data.price)}
        </div>
      ),
    },
    {
      headerTitle: 'Status',
      component: (data: IResCreatorProduct) => (
        <CreatorProductStatusText status={data.status} />
      ),
    },
    {
      headerTitle: 'Created Date',
      sortParam: 'createdDate',
      component: (data: IResCreatorProduct) => (
        <div className="text-muted-foreground">
          {DateHelper.toFormatDate(data.created_date, 'MMM dd, yyyy')}
          <div className="text-xs text-muted-foreground">
            {DateHelper.toFormatDate(data.created_date, 'HH:mm:ss')}
          </div>
        </div>
      ),
    },

    {
      headerTitle: 'Updated Date',
      sortParam: 'updatedDate',
      component: (data: IResCreatorProduct) => (
        <div className="text-muted-foreground">
          {DateHelper.toFormatDate(data.updated_date, 'MMM dd, yyyy')}
          <div className="text-xs text-muted-foreground">
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
          <div className="p-4 text-sm text-muted-foreground">
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
