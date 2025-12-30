import type { CreatorProductStatus } from './IResCreatorProduct'

export type ContentType = 'IMAGE' | 'VIDEO'
export type DiscountType = 'PERCENTAGE' | 'FIXED'

export interface ICreatorProductContent {
  id: string
  url: string
  seq: number
  type: ContentType
}

export interface IResCreatorProductDetail {
  id: string
  name: string
  slug: string
  price: number
  discount: number | null
  discount_type: DiscountType | null
  status: CreatorProductStatus
  description: string
  image: string
  period_start: string
  period_end: string
  category_id: string
  version: number
  content: ICreatorProductContent[]
  tags: string[]
}
