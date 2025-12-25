import { AuthService } from '@/services/auth.service'
import { Bell, LogOut, Settings, User, ChevronDown } from 'lucide-react'
import PageContainer from './PageContainer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useStore } from '@tanstack/react-store'
import { authStore } from '@/store/auth.store'

export default function TopBar() {
  const { account } = useStore(authStore)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 flex bg-white h-16 shrink-0 items-center w-full gap-2 border-b border-gray-200 shadow-sm">
      <PageContainer className="flex justify-between items-center w-full">
        {/* Left Section - Logo/Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Welcome To Cosmic Admin
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-gray-100 px-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={account?.profile_picture}
                    alt={account?.name}
                  />
                  <AvatarFallback className="bg-primary text-white text-xs">
                    {getInitials(account?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {account?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {account?.email || ''}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {account?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {account?.email || ''}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => AuthService.logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </PageContainer>
    </header>
  )
}
