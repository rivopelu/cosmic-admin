import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'
import { Link, useRouterState } from '@tanstack/react-router'
import { Box, Home, ShoppingBag, User } from 'lucide-react'

type Item = {
  title: string
  url: string
  icon?: any
  children?: Item[]
}

type GroupItem = {
  label: string
  items: Item[]
}

const groups: GroupItem[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Home',
        url: ROUTES.HOME(),
        icon: Home,
      },
    ],
  },
  {
    label: 'Account Management',
    items: [
      {
        title: 'Account List',
        url: ROUTES.ACCOUNT_LIST(),
        icon: User,
      },
      {
        title: 'Creator List',
        url: ROUTES.CREATOR_LIST(),
        icon: User,
      },
    ],
  },
  {
    label: 'Product Management',
    items: [
      {
        title: 'Creator Products',
        url: ROUTES.CREATOR_PRODUCT_LIST(),
        icon: ShoppingBag,
      },
    ],
  },
  {
    label: 'Master Data',
    items: [
      {
        title: 'Creator Type',
        url: ROUTES.MASTER_DATA_CREATOR_TYPE(),
        icon: Box,
      },
      {
        title: 'Product Category',
        url: ROUTES.MASTER_DATA_CREATOR_PRODUCT_CATEGORY(),
        icon: Box,
      },
      {
        title: 'Review Reasons',
        url: ROUTES.MASTER_DATA_PRODUCT_REVIEW_REASON(),
        icon: Box,
      },
      {
        title: 'Product Tags',
        url: ROUTES.MASTER_DATA_PRODUCT_TAG(),
        icon: Box,
      },
    ],
  },
]

function SidebarItem({ item }: { item: Item }) {
  const router = useRouterState()
  const isActive = router.location.pathname === item.url

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
      >
        <Link to={item.url} className="font-medium">
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 bg-background" variant="floating">
      <SidebarContent className="bg-card/70 rounded-xl border border-border backdrop-blur-sm shadow-sm">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
