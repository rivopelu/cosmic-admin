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
  MASTER_DATA_PRODUCT_TAG: () => `/master-data/product-tag`,
  MASTER_DATA_PRODUCT_TAG_CATEGORY: () => `/master-data/product-tag-category`,
  SUBSCRIPTION_PLAN_LIST: () => '/subscription-plan' as const,
  SUBSCRIPTION_PLAN_DETAIL: (id: string) => `/subscription-plan/${id}` as const,
}
