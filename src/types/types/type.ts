export type PageLayoutType = 'PRIMARY' | 'FULL_SCREEN'

export interface IFilterList {
  page?: number
  size?: number
  q?: string
  start_date?: string
  end_date?: string
  role?: string
  status?: string
  sort?: string
}
