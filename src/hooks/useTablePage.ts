import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { IFilterList } from '@/types/types/type'

export function useTablePage<T extends IFilterList>(routeId: string) {
  const navigate = useNavigate()
  const search = useSearch({ from: routeId, strict: false } as any) as T

  const [openFilter, setOpenFilter] = useState(false)
  const [searchValue, setSearchValue] = useState(search.q || '')

  useEffect(() => {
    setSearchValue(search.q || '')
  }, [search.q])

  function handleSearch() {
    navigate({
      search: (prev: T) =>
        ({
          ...prev,
          q: searchValue || undefined,
          page: 0,
        }) as T,
    } as any)
  }

  function handlePaginationChange(params: { page?: number; size?: number }) {
    navigate({
      search: (prev: T) =>
        ({
          ...prev,
          page:
            params.size !== undefined && params.size !== prev.size
              ? 0
              : (params.page ?? prev.page),
          size: params.size ?? prev.size,
        }) as T,
    } as any)
  }

  function handleResetSearch() {
    setSearchValue('')
    navigate({
      search: {
        page: 0,
        size: 10,
      } as T,
    } as any)
  }

  function handleFilterApply(values: Partial<T>) {
    navigate({
      search: (prev: T) =>
        ({
          ...prev,
          ...values,
          page: 0,
        }) as T,
    } as any)
    setOpenFilter(false)
  }

  return {
    search,
    searchValue,
    setSearchValue,
    openFilter,
    setOpenFilter,
    handleSearch,
    handlePaginationChange,
    handleResetSearch,
    handleFilterApply,
  }
}
