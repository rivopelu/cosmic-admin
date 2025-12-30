import PageContent from '@/components/PageContent'
import { useDetailAccountPage } from './useDetailAccountPage'
import LoadingCard from '@/components/LoadingCard'
import PageTitle from '@/components/PageTitle'
import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import { ROUTES } from '@/constants/routes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    <PageContent className="grid gap-5">
      <div className="flex justify-between">
        <PageTitle
          description="Detail Account data"
          title="Detail Account"
          breadcrumb={breadcrumbs}
        />
        {data?.status === 'WAITING_APPROVAL_CREATOR' && (
          <div className="flex gap-2">
            <Button variant="outline" color="destructive">
              Reject
            </Button>
            <Button variant="outline" color="success">
              Approve
            </Button>
          </div>
        )}
      </div>
      <Card>
        <CardContent>
          <div>{data?.name || ''}</div>
        </CardContent>
      </Card>
    </PageContent>
  )
}
