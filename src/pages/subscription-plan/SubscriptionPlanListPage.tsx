import AppPagination from '@/components/AppPagination'
import type { ITableColumn } from '@/components/AppTable'
import AppTable from '@/components/AppTable'
import FilterList from '@/components/FilterList'
import InputSearch from '@/components/InputSearch'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import SubscriptionPlanStatusText from '@/components/subscription/SubscriptionPlanStatusText'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { IResSubscriptionPlan } from '@/types/response/IResSubscriptionPlan'
import { formatCurrency } from '@/utils/currency-helper'
import DateHelper from '@/utils/date-helper'
import { Link } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'
import { useSubscriptionPlanListPage } from './useSubscriptionPlanListPage'

export default function SubscriptionPlanListPage() {
  const page = useSubscriptionPlanListPage()

  const tableColumn: Array<ITableColumn<IResSubscriptionPlan>> = [
    {
      headerTitle: 'Plan',
      component: (data: IResSubscriptionPlan) => (
        <div className="flex items-center gap-3">
          <img
            src={data.creator_profile_picture}
            alt={data.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />
          <div>
            <div className="font-semibold text-foreground">{data.name}</div>
            <div className="text-xs text-muted-foreground">
              by {data.creator_name} (@{data.creator_username})
            </div>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Price',
      sortParam: 'price',
      component: (data: IResSubscriptionPlan) => (
        <div className="font-semibold text-foreground">
          {formatCurrency(data.price)}
          <span className="text-xs text-muted-foreground ml-1">
            / {data.duration_days} days
          </span>
        </div>
      ),
    },
    {
      headerTitle: 'Status',
      component: (data: IResSubscriptionPlan) => (
        <SubscriptionPlanStatusText status={data.status} />
      ),
    },
    {
      headerTitle: 'Created Date',
      sortParam: 'createdDate',
      component: (data: IResSubscriptionPlan) => (
        <div className="text-muted-foreground">
          {DateHelper.toFormatDate(data.created_date, 'MMM dd, yyyy')}
          <div className="text-xs text-muted-foreground">
            {DateHelper.toFormatDate(data.created_date, 'HH:mm:ss')}
          </div>
        </div>
      ),
    },
    {
      headerTitle: '',
      component: (data: IResSubscriptionPlan) => (
        <Link to={ROUTES.SUBSCRIPTION_PLAN_DETAIL(data.id)}>
          <Button variant="outline" size={'icon'}>
            <InfoIcon className="w-4 h-4" />
          </Button>
        </Link>
      ),
    },
  ]

  return (
    <PageContent>
      <div className="mb-6">
        <PageTitle
          title="Subscription Plan Management"
          description="Review and manage subscription plans created by users"
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <InputSearch
          handleSearch={page.handleSearch}
          searchValue={page.searchValue}
          setSearchValue={page.setSearchValue}
          placeholder="Search by plan name or creator..."
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
            Filters (Status: Active, Pending, Rejected)
          </div>
        </FilterList>
      </div>

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
