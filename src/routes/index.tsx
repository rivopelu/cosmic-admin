import {
  createRoute,
  type AnyRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { routesConfig, type RouteConfig } from './config'

export function createAppRoutes(rootRoute: AnyRoute) {
  const generateRoutes = (
    configs: RouteConfig[],
    parentRoute: AnyRoute,
  ): AnyRoute[] => {
    return configs.map((config) => {
      const currentPath = config.path || ''

      const Component = config.component
      const WrappedComponent = () => {
        const content = Component ? <Component /> : <Outlet />
        return content
      }

      const route = createRoute({
        getParentRoute: () => parentRoute,
        path: currentPath,
        component: WrappedComponent,
        staticData: {
          layout: config.type,
        },
        beforeLoad: ({ location, context }) => {
          const auth = (context as any).auth
          const isAuthPath = location.pathname.startsWith('/auth')

          if (isAuthPath && auth.isAuthenticated) {
            throw redirect({ to: '/' })
          }

          if (!isAuthPath && !auth.isAuthenticated) {
            throw redirect({ to: '/auth' })
          }
        },
      })

      if (config.children && config.children.length > 0) {
        const children = generateRoutes(config.children, route)
        return route.addChildren(children)
      }

      return route
    })
  }

  return generateRoutes(routesConfig, rootRoute)
}
