import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import type { BaseResponse } from '@/types/response/IResModel'
import type { IResCreatorType } from '@/types/response/IResCreatorType'

export default class MasterDataRepository {
  httpService = new HttpService()
  errorService = new ErrorService()

  getAccountRoles() {
    return this.httpService
      .GET(ENDPOINT.GET_MASTER_DATA_ACCOUNT_ROLES())
      .then((res: BaseResponse<IResLabelValue<string>[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  getAccountStatuses() {
    return this.httpService
      .GET(ENDPOINT.GET_MASTER_DATA_ACCOUNT_STATUSES())
      .then((res: BaseResponse<IResLabelValue<string>[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  getCreatorTypes() {
    return this.httpService
      .GET(ENDPOINT.GET_MASTER_DATA_CREATOR_TYPES())
      .then((res: BaseResponse<IResCreatorType[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  createCreatorType(data: any) {
    return this.httpService
      .POST(ENDPOINT.CREATE_CREATOR_TYPE(), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  updateCreatorType(id: string, data: any) {
    return this.httpService
      .PUT(ENDPOINT.UPDATE_CREATOR_TYPE(id), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  deleteCreatorType(id: string) {
    return this.httpService
      .DELETE(ENDPOINT.DELETE_CREATOR_TYPE(id))
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  getCreatorProductCategories() {
    return this.httpService
      .GET(ENDPOINT.GET_MASTER_DATA_CREATOR_PRODUCT_CATEGORIES())
      .then((res: BaseResponse<any[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  createCreatorProductCategory(data: any) {
    return this.httpService
      .POST(ENDPOINT.CREATE_CREATOR_PRODUCT_CATEGORY(), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  updateCreatorProductCategory(id: string, data: any) {
    return this.httpService
      .PUT(ENDPOINT.UPDATE_CREATOR_PRODUCT_CATEGORY(id), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  deleteCreatorProductCategory(id: string) {
    return this.httpService
      .DELETE(ENDPOINT.DELETE_CREATOR_PRODUCT_CATEGORY(id))
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }
}
