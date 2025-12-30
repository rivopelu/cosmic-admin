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
}
