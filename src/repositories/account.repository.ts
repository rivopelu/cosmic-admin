import type { IFilterList } from '@/types/types/type'
import type { IResAccountList } from '@/types/response/IResAccountList'
import type {
  BaseResponsePaginated,
  rootResponsePaginated,
} from '@/types/response/IResModel'
import { defaultPaginatedResponse } from '@/types/response/IResModel'
import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
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
}
