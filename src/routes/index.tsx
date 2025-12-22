import { createRoute, type AnyRoute } from '@tanstack/react-router'
import { routesConfig, type RouteConfig } from './config'

export function createAppRoutes(rootRoute: AnyRoute) {
  const generateRoutes = (
    configs: RouteConfig[],
    parentRoute: AnyRoute,
  ): AnyRoute[] => {
    return configs.map((config) => {
      const currentPath = config.path || ''

      const route = createRoute({
        getParentRoute: () => parentRoute,
        path: currentPath,
        component: config.component as any,
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
