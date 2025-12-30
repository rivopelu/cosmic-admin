import { useQuery } from '@tanstack/react-query'
import { ROUTES } from '@/constants/routes'
import { useTablePage } from '@/hooks/useTablePage'
import { CreatorProductRepository } from '@/repositories/creator-product.repository'
import type { IFilterCreatorProduct } from '@/types/types/IFilterCreatorProduct'

export function useCreatorProductListPage() {
  const creatorProductRepository = new CreatorProductRepository()

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
  } = useTablePage<IFilterCreatorProduct>(ROUTES.CREATOR_PRODUCT_LIST())

  const filterData: IFilterCreatorProduct = {
    q: search.q,
    page: search.page ?? 0,
    size: search.size ?? 10,
    status: search.status,
    category_id: search.category_id,
    sort: search.sort,
  }

  const queryList = useQuery({
    queryKey: ['list_creator_product', filterData],
    queryFn: async () =>
      await creatorProductRepository.getCreatorProductList(filterData),
  })

  const dataList = queryList.data?.response_data || []

  const activeFilter = filterData.status || filterData.category_id

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
