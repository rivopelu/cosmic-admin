export type CreatorProductStatus =
  | 'PUBLISHED'
  | 'DRAFT'
  | 'PENDING'
  | 'REJECTED'
  | 'DELETED'
  | 'ARCHIVED'

export interface IResCreatorProduct {
  id: string
  image: string
  name: string
  creator_name: string
  category_id: string
  category_name: string
  status: CreatorProductStatus
  price: number
  created_date: number
  updated_date: number
  parent_id: string
}
