import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { IFilterList } from '@/types/types/type'
import { AccountRepository } from '@/repositories/account.repository'
import MasterDataRepository from '@/repositories/master-data.repositories'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import { ROUTES } from '@/constants/routes'

export function useAccountListPage() {
  const navigate = useNavigate({ from: ROUTES.ACCOUNT_LIST() })
  const search = useSearch({ from: ROUTES.ACCOUNT_LIST() }) as IFilterList

  const accountRepository = new AccountRepository()
  const masterDataRepository = new MasterDataRepository()

  const [openFilter, setOpenFilter] = useState(false)
  const [searchValue, setSearchValue] = useState(search.q || '')

  useEffect(() => {
    setSearchValue(search.q || '')
  }, [search.q])

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

  function handleSearch() {
    navigate({
      search: (prev: IFilterList) => ({
        ...prev,
        q: searchValue || undefined,
        page: 0,
      }),
    })
  }

  function handlePaginationChange(params: { page?: number; size?: number }) {
    navigate({
      search: (prev: IFilterList) => ({
        ...prev,
        page:
          params.size !== undefined && params.size !== prev.size
            ? 0
            : (params.page ?? prev.page),
        size: params.size ?? prev.size,
      }),
    })
  }

  function handleResetSearch() {
    setSearchValue('')
    navigate({
      search: () => ({
        page: 0,
        size: 10,
      }),
    })
  }

  function handleFilterApply(values: IFilterList) {
    navigate({
      search: (prev: IFilterList) => ({
        ...prev,
        ...values,
        page: 0,
      }),
    })
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
