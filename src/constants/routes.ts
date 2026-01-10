export const ROUTES = {
  HOME: () => '/' as const,
  CREATOR_LIST: () => '/account/creator' as const,
  ACCOUNT_LIST: () => '/account' as const,
  ACCOUNT_DETAIL: (id: string) => `/account/${id}` as const,
  CREATOR_PRODUCT_LIST: () => '/creator-product' as const,
  CREATOR_PRODUCT_DETAIL: (id: string) => `/creator-product/${id}` as const,
  MASTER_DATA_CREATOR_TYPE: () => `/master-data/creator-type`,
  MASTER_DATA_CREATOR_PRODUCT_CATEGORY: () =>
    `/master-data/creator-product-category`,
  MASTER_DATA_PRODUCT_REVIEW_REASON: () => `/master-data/product-review-reason`,
}
