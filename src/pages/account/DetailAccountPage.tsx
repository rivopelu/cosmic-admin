import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import LoadingCard from '@/components/LoadingCard'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ROUTES } from '@/constants/routes'
import { useDetailAccountPage } from './useDetailAccountPage'
import InputText from '@/components/InputText'
import { FormikProvider } from 'formik'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Clock, User } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import DateHelper from '@/utils/date-helper'

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
          <FormikProvider value={page.formikReason}>
            <div>
              <InputText
                placeholder="Insert reject reason"
                label="Reason"
                name="reason"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                color="destructive"
                onClick={page.onCloseModal}
              >
                Cancel
              </Button>
              <Button
                onClick={() => page.formikReason.handleSubmit()}
                loading={page.mutationReject.isPending}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </FormikProvider>
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

          <div className="flex gap-2">
            <Button
              type="button"
              color="destructive"
              onClick={page.onCloseModal}
            >
              Cancel
            </Button>
            <Button
              onClick={() => page.mutationApprove.mutate()}
              loading={page.mutationApprove.isPending}
              type="submit"
            >
              Submit
            </Button>
          </div>
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
      <PageContent className="grid gap-5">
        <div className="flex justify-between">
          <PageTitle
            description="Detail Account data"
            title="Detail Account"
            breadcrumb={breadcrumbs}
          />
          {data?.status === 'WAITING_APPROVAL_CREATOR' && (
            <div className="flex gap-2">
              <Button
                onClick={() => page.setShowModal('REJECT')}
                variant="outline"
                color="destructive"
              >
                Reject
              </Button>
              <Button
                variant="outline"
                color="success"
                onClick={() => page.setShowModal('APPROVE')}
              >
                Approve
              </Button>
            </div>
          )}
        </div>

        {data?.reject_reason && data?.status !== 'WAITING_APPROVAL_CREATOR' && (
          <Alert className="bg-red-50 border-red-600">
            <AlertTitle className="text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle />
                Request Creator Account Rejected
              </div>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <div className="flex gap-2  w-full">
                <div>{data?.reject_reason}</div>
              </div>
              <Separator className="my-2 bg-red-200" />
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <User size={12} /> <div>{data?.reject_by}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <div>
                    {DateHelper.toFormatDate(
                      data?.reject_date,
                      'dd LLLL, yyyy - HH:mm',
                    )}
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}
        <Card>
          <CardContent>
            <div>{data?.name || ''}</div>
          </CardContent>
        </Card>
      </PageContent>
    </>
  )
}
