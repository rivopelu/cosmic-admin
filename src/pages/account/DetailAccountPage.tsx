import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import LoadingCard from '@/components/LoadingCard'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ROUTES } from '@/constants/routes'
import { DialogContent } from '@radix-ui/react-dialog'
import { useDetailAccountPage } from './useDetailAccountPage'

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

  function dialogReject() {
    return (
      <Dialog
        open={page.showModal == 'REJECT'}
        onOpenChange={page.onCloseModal}
      >
        <DialogContent>
          <DialogTitle>Reject Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this account?
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }

  function dialogApprove() {
    return (
      <Dialog
        open={page.showModal == 'APPROVE'}
        onOpenChange={page.onCloseModal}
      >
        <DialogContent>
          <DialogTitle>Approve Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this account?
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }

  if (page?.queryDetailAccount?.isPending)
    return (
      <PageContent>
        <LoadingCard count={4} />
      </PageContent>
    )

  return (
    <>
      {dialogReject()}
      {dialogApprove()}
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <PageContent className="grid gap-5">
        <div className="flex justify-between">
          <PageTitle
            description="Detail Account data"
            title="Detail Account"
            breadcrumb={breadcrumbs}
          />
          {data?.status !== 'WAITING_APPROVAL_CREATOR' && (
            <div className="flex gap-2">
              <Button
                onClick={() => page.setShowModal('REJECT')}
                variant="outline"
                color="destructive"
              >
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
    </>
  )
}
