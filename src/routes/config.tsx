import CreatorListPage from '@/pages/account/CreatorListPage'
import SignInPage from '@/pages/auth/SignInPage'
import type { PageLayoutType } from '@/types/types/type'
import App from '../pages/App'
import { ROUTES } from '@/constants/routes'

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
    path: ROUTES.CREATOR_LIST(),
    component: CreatorListPage,
    type: 'PRIMARY',
  },
  {
    module: 'auth',
    path: '/auth',
    component: SignInPage,
    type: 'FULL_SCREEN',
  },
]
