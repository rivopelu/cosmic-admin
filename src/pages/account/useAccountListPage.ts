import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { IFilterList } from '@/types/types/type'
import { AccountRepository } from '@/repositories/account.repository'
import MasterDataRepository from '@/repositories/master-data.repositories'
import type { IResLabelValue } from '@/types/response/IResLabelValue'

export function useAccountListPage() {
  const accountRepository = new AccountRepository()
  const masterDataRepository = new MasterDataRepository()
  const [filterData, setFilterData] = useState<IFilterList>(getInitialFilter())
  const [openFilter, setOpenFilter] = useState(false)
  const [searchValue, setSearchValue] = useState(filterData.q)

  function getInitialFilter(): IFilterList {
    return {
      q: undefined,
      page: 0,
      size: 10,
      status: undefined,
    }
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

  function handleSearch() {
    const searchText = searchValue
    if (searchText) {
      setFilterData((prev) => ({
        ...prev,
        q: searchText,
        page: 0,
      }))
    }
  }

  function handlePaginationChange(params: { page?: number; size?: number }) {
    setFilterData((prev) => ({
      ...prev,
      page:
        params.size !== undefined && params.size !== prev.size
          ? 0
          : (params.page ?? prev.page),
      size: params.size ?? prev.size,
    }))
  }

  function handleResetSearch() {
    setSearchValue('')
    setFilterData((prev) => ({
      ...prev,
      q: '',
      page: 0,
      role: undefined,
      status: undefined,
    }))
  }

  function handleFilterApply(values: IFilterList) {
    setFilterData((prev) => ({
      ...prev,
      ...values,
      page: 0,
    }))
    setOpenFilter(false)
  }

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
