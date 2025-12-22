import SignInPage from '@/pages/auth/SignInPage'
import AccountListPage from '../pages/account/AccountList'
import DetailAccountPage from '../pages/account/DetailAccountPage'
import App from '../pages/App'
import type { PageLayoutType } from '@/types/types/type'

export interface RouteConfig {
  module: string
  path?: string
  component?: React.ComponentType
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
    module: 'auth',
    path: '/auth',
    component: SignInPage,
    type: 'FULL_SCREEN',
  },
  {
    module: 'account',
    path: '/account',
    component: AccountListPage,
    children: [
      {
        module: 'detail',
        path: '/$id', // Param path in TanStack is usually prefixed with $
        component: DetailAccountPage,
      },
    ],
  },
]
