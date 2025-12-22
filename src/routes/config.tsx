import AccountListPage from '../pages/account/AccountList'
import DetailAccountPage from '../pages/account/DetailAccountPage'
import App from '../pages/App'

export interface RouteConfig {
  module: string
  path?: string
  component?: React.ComponentType
  children?: RouteConfig[]
}

export const routesConfig: RouteConfig[] = [
  {
    module: 'home',
    path: '/',
    component: App,
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
