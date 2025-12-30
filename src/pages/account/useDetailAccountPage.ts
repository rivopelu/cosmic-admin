import { ROUTES } from '@/constants/routes'
import { AccountRepository } from '@/repositories/account.repository'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

export function useDetailAccountPage() {
  const { id } = useParams({ from: ROUTES.ACCOUNT_DETAIL('$id') })
  const accountRepository = new AccountRepository()

  const queryDetailAccount = useQuery({
    queryKey: ['detail-account', id],
    queryFn: () => accountRepository.getDetailAccount(id),
  })

  return {
    queryDetailAccount,
  }
}
