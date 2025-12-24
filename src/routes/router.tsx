import {
  Outlet,
  createRootRoute,
  createRouter,
  useRouterState,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as TanStackQueryProvider from '../integrations/tanstack-query/root-provider.tsx'
import { createAppRoutes } from './index.tsx'
import { authStore } from '@/store/auth.store'
import { ProfileSync } from '@/components/auth/ProfileSync'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from './MainLayout.tsx'
import type { PageLayoutType } from '@/types/types/type'

function RootComponent() {
  const router = useRouterState()
  const matches = useMatches()

  // Find the last match that has a layout defined
  const lastMatchWithLayout = [...matches]
    .reverse()
    .find((match: any) => match.staticData?.layout) as any
  const layoutType = (lastMatchWithLayout?.staticData?.layout ||
    'FULL_SCREEN') as PageLayoutType

  return (
    <>
      <ProfileSync />
      <MainLayout type={layoutType}>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
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
