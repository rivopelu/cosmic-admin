import { generateInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function AppAvatar({ src, alt }: IProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{generateInitials(alt)}</AvatarFallback>
    </Avatar>
  )
}

interface IProps {
  src: string
  alt: string
}
