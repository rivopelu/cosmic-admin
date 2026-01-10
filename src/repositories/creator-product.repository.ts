import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResCreatorProduct } from '@/types/response/IResCreatorProduct'
import type { IResCreatorProductDetail } from '@/types/response/IResCreatorProductDetail'
import type {
  BaseResponse,
  BaseResponsePaginated,
  rootResponsePaginated,
} from '@/types/response/IResModel'
import { defaultPaginatedResponse } from '@/types/response/IResModel'
import type { IFilterCreatorProduct } from '@/types/types/IFilterCreatorProduct'
import { buildQueryString, buildSearchParams } from '@/utils/searchParamsUtils'

export class CreatorProductRepository {
  httpService = new HttpService()
  errorService = new ErrorService()

  async getCreatorProductList(
    filterData: IFilterCreatorProduct,
  ): Promise<rootResponsePaginated<Array<IResCreatorProduct>>> {
    const params = buildSearchParams(filterData)
    const url =
      `${ENDPOINT.GET_CREATOR_PRODUCT_LIST()}` + buildQueryString(params)
    return await this.httpService
      .GET(url)
      .then((res: BaseResponsePaginated<Array<IResCreatorProduct>>) => {
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

  async getCreatorProductDetail(
    parentId: string,
  ): Promise<IResCreatorProductDetail | undefined> {
    const url = `${ENDPOINT.GET_CREATOR_PRODUCT_DETAIL(parentId)}`
    return await this.httpService
      .GET(url)
      .then((res: BaseResponse<IResCreatorProductDetail>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return undefined
      })
  }

  async rejectCreatorProduct(
    parentId: string,
    data: { reason_id: string | null; custom_reason: string },
  ): Promise<any> {
    const url = `${ENDPOINT.REJECT_CREATOR_PRODUCT(parentId)}`
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
