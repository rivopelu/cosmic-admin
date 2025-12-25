import { useQuery } from '@tanstack/react-query'
import type { IFilterList } from '@/types/types/type'
import { HttpService } from '@/services/htpp.service'
import { ENDPOINT } from '@/constants/endpoint'
import MasterDataRepository from '@/repositories/master-data.repositories'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import { ROUTES } from '@/constants/routes'
import { useTablePage } from '@/hooks/useTablePage'
import type { BaseResponsePaginated } from '@/types/response/IResModel'
import type { IResCreatorList } from '@/types/response/IResCreatorList'

export function useCreatorListPage() {
  const httpService = new HttpService()
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
    handleSort,
  } = useTablePage<IFilterList>(ROUTES.CREATOR_LIST())

  const filterData: IFilterList = {
    q: search.q,
    page: search.page ?? 0,
    size: search.size ?? 10,
    status: search.status,
    sort: search.sort,
  }

  const queryListStatus = useQuery({
    queryKey: ['list_creator_status'],
    queryFn: async () => await masterDataRepository.getAccountStatuses(),
  })

  const queryParams = new URLSearchParams()
  if (filterData.q) queryParams.append('q', filterData.q)
  if (filterData.page !== undefined)
    queryParams.append('page', filterData.page.toString())
  if (filterData.size !== undefined)
    queryParams.append('size', filterData.size.toString())
  if (filterData.status) queryParams.append('status', filterData.status)
  if (filterData.sort) queryParams.append('sort', filterData.sort)

  const queryList = useQuery({
    queryKey: ['list_creator_list', filterData],
    queryFn: () =>
      httpService
        .GET(ENDPOINT.GET_CREATORS(queryParams.toString()))
        .then((res: BaseResponsePaginated<IResCreatorList[]>) => res.data),
  })

  const dataList = queryList.data?.response_data || []
  const dataFilterStatus =
    queryListStatus.data || ([] as IResLabelValue<string>[])

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
    dataFilterStatus,
    handleFilterApply,
    handleSort,
    filterData,
    activeFilter,
    search,
  }
}
