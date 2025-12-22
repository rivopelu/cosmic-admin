import { LOCAL_STORAGE_KEY } from '@/constants/local-storage.key'
import { authStore } from '@/store/auth.store'
import type { IResAccount } from '@/types/response/IResAccount'

export class AuthService {
  public static login(token: string, account: IResAccount) {
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token)
    localStorage.setItem(
      LOCAL_STORAGE_KEY.ACCOUNT_DATA,
      JSON.stringify(account),
    )

    authStore.setState((state) => ({
      ...state,
      isAuthenticated: true,
      token,
      account,
    }))
    window.location.href = '/'
  }

  public static logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCOUNT_DATA)

    authStore.setState((state) => ({
      ...state,
      isAuthenticated: false,
      token: null,
      account: null,
    }))

    // Optional: Redirect to login or clear Query Cache
    window.location.href = '/auth'
  }

  public static updateAccount(account: IResAccount) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.ACCOUNT_DATA,
      JSON.stringify(account),
    )
    authStore.setState((state) => ({
      ...state,
      account,
    }))
  }

  public static getAuthState() {
    return authStore.state
  }
}
