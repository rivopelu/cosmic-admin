import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function SignInPage() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="w-full bg-slate-400 h-full">LEFT</div>
      <div className="w-full h-full flex items-center justify-center">
        <Card>
          <CardContent>
            <div className="grid gap-2 min-w-sm">
              <Input type="text" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
