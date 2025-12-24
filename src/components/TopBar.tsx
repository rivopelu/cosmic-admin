import { AuthService } from '@/services/auth.service'
import { LogIn, Settings, User } from 'lucide-react'
import PageContainer from './PageContainer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function TopBar() {
  return (
    <header className="flex bg-white h-16 shrink-0 items-center  w-full  gap-2 border-b px-4  ">
      <PageContainer className="flex justify-between w-full">
        <div>Welcome to Cosmic Admin</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>PROFILE</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <User />
                  Profile
                </div>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <Settings />
                  Settings
                </div>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => AuthService.logout()}
            >
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <LogIn color="red" />
                  Logout
                </div>
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageContainer>
    </header>
  )
}
