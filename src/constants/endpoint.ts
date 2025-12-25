export const ENDPOINT = {
  SIGN_IN: () => '/auth/login',
  GET_PROFILE: () => '/auth/profile',
  GET_CREATORS: (params: string) => `/creator?${params}`,
  GET_ACCOUNT_LIST: () => '/admin/accounts',
}
