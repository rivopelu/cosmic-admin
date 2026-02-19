import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResSubscriptionPlan } from '@/types/response/IResSubscriptionPlan'
import type {
  BaseResponse,
  BaseResponsePaginated,
  rootResponsePaginated,
} from '@/types/response/IResModel'
import { defaultPaginatedResponse } from '@/types/response/IResModel'
import type { IFilterSubscriptionPlan } from '@/types/types/IFilterSubscriptionPlan'
import { buildQueryString, buildSearchParams } from '@/utils/searchParamsUtils'

export class SubscriptionRepository {
  httpService = new HttpService()
  errorService = new ErrorService()

  async getSubscriptionPlanList(
    filterData: IFilterSubscriptionPlan,
  ): Promise<rootResponsePaginated<Array<IResSubscriptionPlan>>> {
    const params = buildSearchParams(filterData)
    const url =
      `${ENDPOINT.GET_SUBSCRIPTION_PLAN_LIST()}` + buildQueryString(params)
    return await this.httpService
      .GET(url)
      .then((res: BaseResponsePaginated<Array<IResSubscriptionPlan>>) => {
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

  async getSubscriptionPlanDetail(
    id: string,
  ): Promise<IResSubscriptionPlan | undefined> {
    const url = `${ENDPOINT.GET_SUBSCRIPTION_PLAN_DETAIL(id)}`
    return await this.httpService
      .GET(url)
      .then((res: BaseResponse<IResSubscriptionPlan>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return undefined
      })
  }

  async approveSubscriptionPlan(id: string): Promise<any> {
    const url = `${ENDPOINT.APPROVE_SUBSCRIPTION_PLAN(id)}`
    return await this.httpService
      .PUT(url, {})
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  async rejectSubscriptionPlan(
    id: string,
    data: { reason: string },
  ): Promise<any> {
    const url = `${ENDPOINT.REJECT_SUBSCRIPTION_PLAN(id)}`
    return await this.httpService
      .PUT(url, data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }
}
