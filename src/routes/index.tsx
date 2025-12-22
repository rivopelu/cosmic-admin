import { createRoute, type AnyRoute, Outlet } from '@tanstack/react-router'
import { routesConfig, type RouteConfig } from './config'
import MainLayout from './MainLayout'

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

        if (config.type) {
          return <MainLayout type={config.type}>{content}</MainLayout>
        }

        return content
      }

      const route = createRoute({
        getParentRoute: () => parentRoute,
        path: currentPath,
        component: WrappedComponent,
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
