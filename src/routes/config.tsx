import CreatorListPage from '@/pages/account/CreatorListPage'
import SignInPage from '@/pages/auth/SignInPage'
import type { PageLayoutType } from '@/types/types/type'
import App from '../pages/App'
import { ROUTES } from '@/constants/routes'
import AccountListPage from '@/pages/account/AccountListPage'

export interface RouteConfig {
  module: string
  path?: string
  component?: React.ComponentType | (() => Promise<React.ComponentType>) | any
  children?: RouteConfig[]
  type?: PageLayoutType
  validateSearch?: (search: Record<string, unknown>) => any
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
    validateSearch: (search: Record<string, unknown>) => {
      return {
        q: (search.q as string) || undefined,
        page: Number(search.page) || 0,
        size: Number(search.size) || 10,
        status: (search.status as string) || undefined,
        sort: (search.sort as string) || undefined,
      }
    },
  },
  {
    module: 'account',
    path: ROUTES.ACCOUNT_LIST(),
    component: AccountListPage,
    type: 'PRIMARY',
    validateSearch: (search: Record<string, unknown>) => {
      return {
        q: (search.q as string) || undefined,
        page: Number(search.page) || 0,
        size: Number(search.size) || 10,
        role: (search.role as string) || undefined,
        status: (search.status as string) || undefined,
        sort: (search.sort as string) || undefined,
      }
    },
  },
  {
    module: 'auth',
    path: '/auth',
    component: SignInPage,
    type: 'FULL_SCREEN',
  },
]
