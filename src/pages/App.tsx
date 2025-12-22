import { Button } from '@/components/ui/button'
import { AuthService } from '@/services/auth.service'

export default function App() {
  return (
    <div className=" w-full min-h-screen">
      App
      <div>
        <Button onClick={AuthService.logout}>LOGOUT</Button>
      </div>
    </div>
  )
}
