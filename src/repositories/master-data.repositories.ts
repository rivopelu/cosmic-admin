import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import type { IResLabelValue } from '@/types/response/IResLabelValue'
import type { BaseResponse } from '@/types/response/IResModel'

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
}
