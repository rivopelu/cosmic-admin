import { useQuery } from '@tanstack/react-query'
import type { IFilterList } from '@/types/types/type'
import { AccountRepository } from '@/repositories/account.repository'
import MasterDataRepository from '@/repositories/master-data.repositories'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import { ROUTES } from '@/constants/routes'
import { useTablePage } from '@/hooks/useTablePage'

export function useAccountListPage() {
  const accountRepository = new AccountRepository()
  const masterDataRepository = new MasterDataRepository()

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
  } = useTablePage<IFilterList>(ROUTES.ACCOUNT_LIST())

  const filterData: IFilterList = {
    q: search.q,
    page: search.page ?? 0,
    size: search.size ?? 10,
    role: search.role,
    status: search.status,
  }

  const queryListRole = useQuery({
    queryKey: ['list_account_role'],
    queryFn: async () => await masterDataRepository.getAccountRoles(),
  })

  const queryListStatus = useQuery({
    queryKey: ['list_account_status'],
    queryFn: async () => await masterDataRepository.getAccountStatuses(),
  })

  const queryList = useQuery({
    queryKey: ['list_account_list', filterData],
    queryFn: async () => await accountRepository.getAccountList(filterData),
  })

  const dataList = queryList.data?.response_data || []
  const dataFilterRole = queryListRole.data || ([] as IResLabelValue<string>[])
  const dataFilterStatus =
    queryListStatus.data || ([] as IResLabelValue<string>[])

  const activeFilter = filterData.role || filterData.status

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
    dataFilterRole,
    dataFilterStatus,
    handleFilterApply,
    filterData,
    activeFilter,
  }
}
