import PageContent from '@/components/PageContent'
import { useDetailAccountPage } from './useDetailAccountPage'
import LoadingCard from '@/components/LoadingCard'
import PageTitle from '@/components/PageTitle'
import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import { ROUTES } from '@/constants/routes'

export default function DetailAccountPage() {
  const page = useDetailAccountPage()
  const data = page.queryDetailAccount.data

  const breadcrumbs: IBreadcrumbData[] = [
    {
      label: 'Account',
      path: ROUTES.ACCOUNT_LIST(),
    },
    {
      label: data?.name || '',
    },
  ]

  if (page?.queryDetailAccount?.isPending)
    return (
      <PageContent>
        <LoadingCard count={4} />
      </PageContent>
    )
  return (
    <PageContent>
      <PageTitle
        description="Detail Account data"
        title="Detail Account"
        breadcrumb={breadcrumbs}
      />
    </PageContent>
  )
}
