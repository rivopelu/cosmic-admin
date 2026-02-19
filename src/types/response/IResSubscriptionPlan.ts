export interface IResSubscriptionPlan {
  id: string
  creator_id: string
  name: string
  description: string
  price: number
  duration_days: number
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'REJECTED'
  benefits: string[]
  created_date: number
  updated_date: number
  creator_name: string
  creator_username: string
  creator_profile_picture: string
  reject_reason: string | null
  reject_date: number | null
  approved_date: number | null
  reject_by_name?: string | null
  reject_by_image?: string | null
  approved_by_name?: string | null
  approved_by_image?: string | null
}
