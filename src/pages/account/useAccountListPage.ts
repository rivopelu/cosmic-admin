import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import type { IFilterList } from '@/types/types/type'
import { AccountRepository } from '@/repositories/AccountRepository'

export function useAccountListPage() {
  const accountRepository = new AccountRepository()
  const [filterData, setFilterData] = useState<IFilterList>(getInitialFilter())

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

  return {
    dataList,
    queryList,
  }
}
