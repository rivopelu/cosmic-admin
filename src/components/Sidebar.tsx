import { Button } from './ui/button'
import { AuthService } from '@/services/auth.service'

export default function Sidebar() {
  return (
    <div className="h-screen  left-0 w-sidebar bg-red-400">
      Sidebar <Button onClick={() => AuthService.logout()}>LOGOUT</Button>
    </div>
  )
}
