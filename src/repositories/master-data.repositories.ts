import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import type { BaseResponse } from '@/types/response/IResModel'
import type { IResCreatorType } from '@/types/response/IResCreatorType'
import type { IResProductReviewReason } from '@/types/response/IResProductReviewReason'
import type { IResProductTag } from '@/types/response/IResProductTag'

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

  getProductReviewReasons() {
    return this.httpService
      .GET(ENDPOINT.GET_PRODUCT_REVIEW_REASONS())
      .then((res: BaseResponse<IResProductReviewReason[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  createProductReviewReason(data: { title: string; description: string }) {
    return this.httpService
      .POST(ENDPOINT.CREATE_PRODUCT_REVIEW_REASON(), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  updateProductReviewReason(
    id: string,
    data: { title: string; description: string },
  ) {
    return this.httpService
      .PUT(ENDPOINT.UPDATE_PRODUCT_REVIEW_REASON(id), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  deleteProductReviewReason(id: string) {
    return this.httpService
      .DELETE(ENDPOINT.DELETE_PRODUCT_REVIEW_REASON(id))
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  getProductTags() {
    return this.httpService
      .GET(ENDPOINT.GET_MASTER_DATA_PRODUCT_TAGS())
      .then((res: BaseResponse<IResProductTag[]>) => {
        return res.data.response_data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        return []
      })
  }

  createProductTag(data: { name: string; description?: string }) {
    return this.httpService
      .POST(ENDPOINT.CREATE_PRODUCT_TAG(), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  updateProductTag(id: string, data: { name?: string; description?: string }) {
    return this.httpService
      .PUT(ENDPOINT.UPDATE_PRODUCT_TAG(id), data)
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }

  deleteProductTag(id: string) {
    return this.httpService
      .DELETE(ENDPOINT.DELETE_PRODUCT_TAG(id))
      .then((res: BaseResponse<any>) => {
        return res.data
      })
      .catch((e) => {
        this.errorService.fetchApiError(e)
        throw e
      })
  }
}
