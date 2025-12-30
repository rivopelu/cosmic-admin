import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResAccountList } from '@/types/response/IResAccountList'
import type { IResDetailAccount } from '@/types/response/IResDetailAccount'
import type {
  BaseResponse,
  BaseResponsePaginated,
  rootResponsePaginated,
} from '@/types/response/IResModel'
import { defaultPaginatedResponse } from '@/types/response/IResModel'
import type { IFilterList } from '@/types/types/type'
import { buildQueryString, buildSearchParams } from '@/utils/searchParamsUtils'

export class AccountRepository {
  httpService = new HttpService()
  errorService = new ErrorService()
  async getAccountList(
    filterData: IFilterList,
  ): Promise<rootResponsePaginated<Array<IResAccountList>>> {
    const params = buildSearchParams(filterData)
    const url = `${ENDPOINT.GET_ACCOUNT_LIST()}` + buildQueryString(params)
    return await this.httpService
      .GET(url)
      .then((res: BaseResponsePaginated<Array<IResAccountList>>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return {
          response_data: [],
          paginated_data: defaultPaginatedResponse,
        }
      })
  }

  async getDetailAccount(id: string): Promise<IResDetailAccount | undefined> {
    const url = `${ENDPOINT.DETAIL_ACCOUNT(id)}`
    return await this.httpService
      .GET(url)
      .then((res: BaseResponse<IResDetailAccount>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return undefined
      })
  }

  async rejectAccount(id: string, data: { reason: string }) {
    const url = `${ENDPOINT.REJECT_CREATOR(id)}`
    return await this.httpService
      .PUT(url, data)
      .then((res: BaseResponse<IResDetailAccount>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return undefined
      })
  }

  async approveAccount(id: string) {
    const url = `${ENDPOINT.APPROVE_CREATOR(id)}`
    return await this.httpService
      .PATCH(url)
      .then((res: BaseResponse<IResDetailAccount>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return undefined
      })
  }
}
