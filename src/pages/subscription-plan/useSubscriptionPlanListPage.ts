import { ROUTES } from '@/constants/routes'
import { useSubscriptionPlan } from '@/hooks/useSubscriptionPlan'
import { useTablePage } from '@/hooks/useTablePage'
import type { IFilterSubscriptionPlan } from '@/types/types/IFilterSubscriptionPlan'

export function useSubscriptionPlanListPage() {
  const {
    search,
    searchValue,
    setSearchValue,
    openFilter,
    setOpenFilter,
    handleSearch,
    handlePaginationChange,
    handleResetSearch,
    handleFilterApply,
    handleSort,
  } = useTablePage<IFilterSubscriptionPlan>(ROUTES.SUBSCRIPTION_PLAN_LIST())

  const filterData: IFilterSubscriptionPlan = {
    q: search.q,
    page: search.page ?? 0,
    size: search.size ?? 10,
    status: search.status,
    sort: search.sort,
  }

  const queryList = useSubscriptionPlan(filterData)

  const dataList = queryList.data?.response_data || []

  const activeFilter = filterData.status

  return {
    dataList,
    queryList,
    handlePaginationChange,
    handleResetSearch,
    openFilter,
    setOpenFilter,
    searchValue,
    setSearchValue,
    handleSearch,
    handleFilterApply,
    handleSort,
    filterData,
    activeFilter,
    search,
  }
}
