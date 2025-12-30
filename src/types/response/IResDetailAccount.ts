import type { IResSocialMedia } from './IResSocialMedia'

export interface IResDetailAccount {
  id: string
  name: string
  email: string
  username: string
  artist_name: string
  creator_type_name: string
  creator_type_id: string
  status: string
  status_string: string
  created_date: number
  updated_date: number
  profile_picture: string
  banner: string
  role_enum: string
  social_media_list: Array<IResSocialMedia>
  approve_date: number
  approve_by: string
}
