import { Store } from '@tanstack/react-store'
import type { IResAccount } from '@/types/response/IResAccount'
import { LOCAL_STORAGE_KEY } from '@/constants/local-storage.key'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  account: IResAccount | null
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  const accountStr = localStorage.getItem(LOCAL_STORAGE_KEY.ACCOUNT_DATA)
  const account = accountStr ? JSON.parse(accountStr) : null

  return {
    isAuthenticated: !!token,
    token,
    account,
  }
}

export const authStore = new Store<AuthState>(getInitialState())
