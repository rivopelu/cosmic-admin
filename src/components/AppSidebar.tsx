import {
  Home,
  User,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Box,
} from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'

type Item = {
  title: string
  url: string
  icon?: any
  children?: Item[]
}

const items: Item[] = [
  {
    title: 'Home',
    url: ROUTES.HOME(),
    icon: Home,
  },
  {
    title: 'Account',
    url: ROUTES.ACCOUNT_LIST(),
    icon: User,
    children: [
      {
        title: 'Account',
        url: ROUTES.ACCOUNT_LIST(),
        icon: User,
      },
      {
        title: 'Creator',
        url: ROUTES.CREATOR_LIST(),
        icon: User,
      },
    ],
  },
  {
    title: 'Product',
    url: ROUTES.CREATOR_PRODUCT_LIST(),
    icon: ShoppingBag,
    children: [
      {
        title: 'Creator Product',
        url: ROUTES.CREATOR_PRODUCT_LIST(),
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: 'Master Data',
    url: ROUTES.MASTER_DATA_CREATOR_TYPE(),
    icon: Box,
    children: [
      {
        title: 'Creator Type',
        url: ROUTES.MASTER_DATA_CREATOR_TYPE(),
        icon: Box,
      },
      {
        title: 'Creator Product Category',
        url: ROUTES.MASTER_DATA_CREATOR_PRODUCT_CATEGORY(),
        icon: Box,
      },
      {
        title: 'Product Review Reason',
        url: ROUTES.MASTER_DATA_PRODUCT_REVIEW_REASON(),
        icon: Box,
      },
    ],
  },
]

function SidebarItem({ item }: { item: Item }) {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouterState()
  const hasChildren = item.children && item.children.length > 0
  const isChildActive =
    hasChildren &&
    item.children?.some((child) =>
      router.location.pathname.startsWith(child.url),
    )

  const isOpen = isClicked || isHovered || isChildActive

  if (hasChildren) {
    return (
      <SidebarMenuItem
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SidebarMenuButton
          onClick={() => setIsClicked((prev) => !prev)}
          className={cn(isChildActive && 'text-primary hover:text-primary')}
        >
          {item.icon && <item.icon />}
          <span className="font-medium">{item.title}</span>
          <div className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </SidebarMenuButton>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <SidebarMenuSub>
                {item.children?.map((child) => (
                  <SidebarSubItem key={child.title} item={child} />
                ))}
              </SidebarMenuSub>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={item.url}
          activeProps={{
            className: 'text-primary hover:text-primary font-medium',
          }}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarSubItem({ item }: { item: Item }) {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const isOpen = isClicked || isHovered

  if (hasChildren) {
    return (
      <SidebarMenuSubItem
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SidebarMenuSubButton
          onClick={() => setIsClicked((prev) => !prev)}
          className="cursor-pointer"
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          <div className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </SidebarMenuSubButton>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <SidebarMenuSub>
                {item.children?.map((child) => (
                  <SidebarSubItem key={child.title} item={child} />
                ))}
              </SidebarMenuSub>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMenuSubItem>
    )
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link
          to={item.url}
          activeProps={{
            className: 'text-primary hover:text-primary font-medium',
          }}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-12">
            <div className="text-xl font-bold">COSMIC</div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
