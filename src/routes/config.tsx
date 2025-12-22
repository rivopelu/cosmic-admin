import SignInPage from '@/pages/auth/SignInPage'
import type { PageLayoutType } from '@/types/types/type'
import App from '../pages/App'
import AccountPage from '@/pages/account/AccountPage'

export interface RouteConfig {
  module: string
  path?: string
  component?: React.ComponentType | (() => Promise<React.ComponentType>) | any
  children?: RouteConfig[]
  type?: PageLayoutType
}

export const routesConfig: RouteConfig[] = [
  {
    module: 'home',
    path: '/',
    component: App,
    type: 'PRIMARY',
  },
  {
    module: 'account',
    path: '/account',
    component: AccountPage,
    type: 'PRIMARY',
  },
  {
    module: 'auth',
    path: '/auth',
    component: SignInPage,
    type: 'FULL_SCREEN',
  },
]
