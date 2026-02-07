import CreatorListPage from '@/pages/account/CreatorListPage'
import SignInPage from '@/pages/auth/SignInPage'
import type { PageLayoutType } from '@/types/types/type'
import App from '../pages/App'
import { ROUTES } from '@/constants/routes'
import AccountListPage from '@/pages/account/AccountListPage'
import DetailAccountPage from '@/pages/account/DetailAccountPage'
import CreatorProductListPage from '@/pages/creator-product/CreatorProductListPage'
import CreatorProductDetailPage from '@/pages/creator-product/CreatorProductDetailPage'
import CreatorTypePage from '@/pages/master-data/CreatorTypePage'
import CreatorProductCategoryPage from '@/pages/master-data/CreatorProductCategoryPage'
import ProductReviewReasonPage from '@/pages/master-data/ProductReviewReasonPage'
import ProductTagPage from '@/pages/master-data/ProductTagPage'

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
    module: 'master-data',
    path: ROUTES.MASTER_DATA_CREATOR_TYPE(),
    component: CreatorTypePage,
    type: 'PRIMARY',
  },
  {
    module: 'master-data',
    path: ROUTES.MASTER_DATA_CREATOR_PRODUCT_CATEGORY(),
    component: CreatorProductCategoryPage,
    type: 'PRIMARY',
  },
  {
    module: 'master-data',
    path: ROUTES.MASTER_DATA_PRODUCT_REVIEW_REASON(),
    component: ProductReviewReasonPage,
    type: 'PRIMARY',
  },
  {
    module: 'master-data',
    path: ROUTES.MASTER_DATA_PRODUCT_TAG(),
    component: ProductTagPage,
    type: 'PRIMARY',
  },
  {
    module: 'account',
    path: ROUTES.ACCOUNT_DETAIL('$id'),
    component: DetailAccountPage,
    type: 'PRIMARY',
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
    module: 'creator-product',
    path: ROUTES.CREATOR_PRODUCT_LIST(),
    component: CreatorProductListPage,
    type: 'PRIMARY',
    validateSearch: (search: Record<string, unknown>) => {
      return {
        q: (search.q as string) || undefined,
        page: Number(search.page) || 0,
        size: Number(search.size) || 10,
        status: (search.status as string) || undefined,
        category_id: (search.category_id as string) || undefined,
        sort: (search.sort as string) || undefined,
      }
    },
  },
  {
    module: 'creator-product',
    path: ROUTES.CREATOR_PRODUCT_DETAIL('$id'),
    component: CreatorProductDetailPage,
    type: 'PRIMARY',
  },
  {
    module: 'auth',
    path: '/auth',
    component: SignInPage,
    type: 'FULL_SCREEN',
  },
]
