import type { AxiosResponse } from 'axios'

export interface IPaginatedParams {
  page: number
  size: number
  total_data?: number
  sort?: string
}

export const defaultPaginatedData: IPaginatedParams = {
  page: 0,
  size: 10,
  total_data: 0,
}

export interface IHeaderTabs {
  title: string
  idx: number
  icon?: string
  activeIcons?: string
}

export interface rootResponse<T> {
  response_data: T
}

interface rootResponseMessage {
  response_data: string
}

export interface rootResponsePaginated<T> {
  response_data: T
  paginated_data: IResPaginatedData
}

export interface IResPaginatedData {
  page: number
  size: number
  total_data: number
  page_count: number
}

export const defaultPaginatedResponse: IResPaginatedData = {
  page: 0,
  size: 0,
  total_data: 0,
  page_count: 0,
}

export type BaseResponse<T> = AxiosResponse<rootResponse<T>>
export type BaseResponseMessage = AxiosResponse<rootResponseMessage>
export type BaseResponsePaginated<T> = AxiosResponse<rootResponsePaginated<T>>
