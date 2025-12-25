import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { IFilterList } from '@/types/types/type'
import { AccountRepository } from '@/repositories/AccountRepository'

export function useAccountListPage() {
  const accountRepository = new AccountRepository()
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

  const queryList = useQuery({
    queryKey: ['list_account_list', filterData],
    queryFn: async () => await accountRepository.getAccountList(filterData),
  })
  const dataList = queryList.data?.response_data || []

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
    }))
  }

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
  }
}
