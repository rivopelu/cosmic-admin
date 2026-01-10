export const ENDPOINT = {
  SIGN_IN: () => '/auth/login',
  GET_PROFILE: () => '/auth/profile',
  GET_CREATORS: (params: string) => `/creator?${params}`,
  GET_ACCOUNT_LIST: () => '/admin/accounts',
  GET_MASTER_DATA_ACCOUNT_ROLES: () => '/master-data/account-roles',
  GET_MASTER_DATA_ACCOUNT_STATUSES: () => '/master-data/account-statuses',
  DETAIL_ACCOUNT: (id: string) => `/admin/account/${id}`,
  REJECT_CREATOR: (id: string) => `/admin/reject-creator/${id}`,
  APPROVE_CREATOR: (id: string) => `/admin/approve-creator/${id}`,
  GET_CREATOR_PRODUCT_LIST: () => '/creator-product/admin',
  GET_CREATOR_PRODUCT_DETAIL: (parentId: string) =>
    `/creator-product/admin/${parentId}`,
  GET_MASTER_DATA_CREATOR_TYPES: () => '/master-data/creator-types',
  CREATE_CREATOR_TYPE: () => '/master-data/creator-types',
  UPDATE_CREATOR_TYPE: (id: string) => `/master-data/creator-types/${id}`,
  DELETE_CREATOR_TYPE: (id: string) => `/master-data/creator-types/${id}`,
  GET_MASTER_DATA_CREATOR_PRODUCT_CATEGORIES: () =>
    '/master-data/creator-product-categories',
  CREATE_CREATOR_PRODUCT_CATEGORY: () =>
    '/master-data/creator-product-categories',
  UPDATE_CREATOR_PRODUCT_CATEGORY: (id: string) =>
    `/master-data/creator-product-categories/${id}`,
  DELETE_CREATOR_PRODUCT_CATEGORY: (id: string) =>
    `/master-data/creator-product-categories/${id}`,
  GET_PRODUCT_REVIEW_REASONS: () => '/master-data/product-review-reasons',
  CREATE_PRODUCT_REVIEW_REASON: () => '/master-data/product-review-reasons',
  UPDATE_PRODUCT_REVIEW_REASON: (id: string) =>
    `/master-data/product-review-reasons/${id}`,
  DELETE_PRODUCT_REVIEW_REASON: (id: string) =>
    `/master-data/product-review-reasons/${id}`,
}
