export const ROUTES = {
  HOME: () => '/' as const,
  CREATOR_LIST: () => '/account/creator' as const,
  ACCOUNT_LIST: () => '/account' as const,
  ACCOUNT_DETAIL: (id: string) => `/account/${id}` as const,
  CREATOR_PRODUCT_LIST: () => '/creator-product' as const,
  CREATOR_PRODUCT_DETAIL: (id: string) => `/creator-product/${id}` as const,
}
