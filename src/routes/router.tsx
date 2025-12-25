import { ProfileSync } from '@/components/auth/ProfileSync'
import { authStore } from '@/store/auth.store'
import type { PageLayoutType } from '@/types/types/type'
import {
  Outlet,
  createRootRoute,
  createRouter,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as TanStackQueryProvider from '../integrations/tanstack-query/root-provider.tsx'
import { createAppRoutes } from './index.tsx'
import MainLayout from './MainLayout.tsx'

function RootComponent() {
  const matches = useMatches()

  const lastMatchWithLayout = [...matches]
    .reverse()
    .find((match: any) => match.staticData?.layout) as any
  const layoutType = (lastMatchWithLayout?.staticData?.layout ||
    'FULL_SCREEN') as PageLayoutType

  return (
    <>
      <ProfileSync />
      <MainLayout type={layoutType}>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  )
}

export const rootRoute = createRootRoute({
  component: RootComponent,
})

const routeTree = rootRoute.addChildren(createAppRoutes(rootRoute))

export const TanStackQueryProviderContext = TanStackQueryProvider.getContext()

export const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    auth: authStore.state,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { TanStackQueryProvider }
