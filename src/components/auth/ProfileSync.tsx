import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authStore } from '@/store/auth.store'
import { AuthService } from '@/services/auth.service'
import { HttpService } from '@/services/htpp.service'
import { ENDPOINT } from '@/constants/endpoint'
import type { BaseResponse } from '@/types/response/IResModel'
import type { IResAccount } from '@/types/response/IResAccount'
import { useStore } from '@tanstack/react-store'

export function ProfileSync() {
  const auth = useStore(authStore)
  const httpService = new HttpService()

  const { data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      httpService
        .GET(ENDPOINT.GET_PROFILE())
        .then((res: BaseResponse<IResAccount>) => res.data.response_data),
    enabled: auth.isAuthenticated,
    staleTime: Infinity, // Only fetch once per session or manually invalidate
  })

  useEffect(() => {
    if (isSuccess && data) {
      AuthService.updateAccount(data)
    }
  }, [isSuccess, data])

  return null
}
