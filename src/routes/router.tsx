import { Outlet, createRootRoute, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as TanStackQueryProvider from '../integrations/tanstack-query/root-provider.tsx'
import { createAppRoutes } from './index.tsx'
import { authStore } from '@/store/auth.store'
import { ProfileSync } from '@/components/auth/ProfileSync'

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <ProfileSync />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
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
