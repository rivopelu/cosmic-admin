import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HttpService } from '@/services/htpp.service'
import { ENDPOINT } from '@/constants/endpoint'
import type { BaseResponsePaginated } from '@/types/response/IResModel'
import type { IResCreatorList } from '@/types/response/IResCreatorList'

export function useAccountPage() {
  const httpService = new HttpService()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string[]>([])
  const [sort, setSort] = useState('name,asc')

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  })

  if (search) queryParams.append('q', search)
  if (status.length > 0) queryParams.append('status', status.join(','))

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['creators', page, size, search, status, sort],
    queryFn: () =>
      httpService
        .GET(ENDPOINT.GET_CREATORS(queryParams.toString()))
        .then((res: BaseResponsePaginated<IResCreatorList[]>) => res.data),
  })

  const toggleStatus = (s: string) => {
    setStatus((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s],
    )
    setPage(0)
  }

  return {
    data: data?.response_data || [],
    pagination: data?.paginated_data,
    isLoading,
    isError,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch: (val: string) => {
      setSearch(val)
      setPage(0)
    },
    status,
    toggleStatus,
    setSort: (val: string) => {
      setSort(val)
      setPage(0)
    },
    sort,
    refetch,
  }
}
