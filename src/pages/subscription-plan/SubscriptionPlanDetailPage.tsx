import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import InputTextArea from '@/components/InputTextArea'
import LoadingCard from '@/components/LoadingCard'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/currency-helper'
import DateHelper from '@/utils/date-helper'
import { Form, Formik } from 'formik'
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  User,
  XCircle,
} from 'lucide-react'
import * as Zod from 'zod'
import { useSubscriptionPlanDetailPage } from './useSubscriptionPlanDetailPage'
import SubscriptionPlanStatusText from '@/components/subscription/SubscriptionPlanStatusText'

const rejectSchema = Zod.object({
  reason: Zod.string().min(1, 'Reason is required'),
})

export default function SubscriptionPlanDetailPage() {
  const page = useSubscriptionPlanDetailPage()
  const data = page.queryDetail.data

  const breadcrumbs: IBreadcrumbData[] = [
    {
      label: 'Subscription Plans',
      path: ROUTES.SUBSCRIPTION_PLAN_LIST(),
    },
    {
      label: data?.name || 'Detail',
    },
  ]

  if (page.queryDetail.isPending) {
    return (
      <PageContent>
        <LoadingCard count={3} />
      </PageContent>
    )
  }

  if (!data) {
    return (
      <PageContent>
        <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
          <FileText className="w-16 h-16 mb-4 opacity-20" />
          <p>Subscription plan not found</p>
          <Button variant="link" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </PageContent>
    )
  }

  return (
    <PageContent className="grid gap-6">
      <div className="flex justify-between items-start">
        <PageTitle
          title="Plan Details"
          description="Review subscription plan information and status"
          breadcrumb={breadcrumbs}
        />
        {data.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => page.setOpenDialog('REJECT')}
            >
              Reject
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => page.setOpenDialog('APPROVE')}
            >
              Approve
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{data.name}</CardTitle>
              <SubscriptionPlanStatusText status={data.status} />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{data.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Price
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(data.price)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Duration
                  </p>
                  <p className="text-lg font-bold">{data.duration_days} Days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Rejection Info if any */}
          {data.status === 'REJECTED' && data.reject_reason && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{data.reject_reason}</p>
                {(data.reject_by_name || data.reject_date) && (
                  <div className="mt-4 pt-4 border-t border-red-500/10 flex items-center gap-4 text-xs text-muted-foreground">
                    {data.reject_by_name && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" /> By {data.reject_by_name}
                      </div>
                    )}
                    {data.reject_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{' '}
                        {DateHelper.toFormatDate(
                          data.reject_date,
                          'MMM dd, yyyy',
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Approval Info if any */}
          {data.status === 'ACTIVE' && data.approved_date && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground px-2">
              {data.approved_by_name && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" /> Approved by{' '}
                  {data.approved_by_name}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Approved on{' '}
                {DateHelper.toFormatDate(data.approved_date, 'MMM dd, yyyy')}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Creator info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src={data.creator_profile_picture}
                  alt={data.creator_name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold">{data.creator_name}</p>
                  <p className="text-xs text-muted-foreground">
                    @{data.creator_username}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Creator ID</span>
                  <span className="font-mono">{data.creator_id}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Created Date</span>
                  <span>
                    {DateHelper.toFormatDate(data.created_date, 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog
        open={page.openDialog === 'APPROVE'}
        onOpenChange={(open) => !open && page.onCloseDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Subscription Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve "{data.name}"? This will make the
              plan active and visible to users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={page.onCloseDialog}
              disabled={page.isApproving}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={page.handleApprove}
              loading={page.isApproving}
              disabled={page.isApproving}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={page.openDialog === 'REJECT'}
        onOpenChange={(open) => !open && page.onCloseDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Subscription Plan</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this plan. The creator will
              see this reason.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{ reason: '' }}
            validate={(values) => {
              const result = rejectSchema.safeParse(values)
              if (!result.success) {
                const errors: any = {}
                result.error.issues.forEach((issue) => {
                  errors[issue.path[0] as string] = issue.message
                })
                return errors
              }
            }}
            onSubmit={(values) => page.handleReject(values.reason)}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputTextArea
                  name="reason"
                  label="Rejection Reason"
                  placeholder="e.g., Price is too low, Invalid description, etc."
                  rows={4}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={page.onCloseDialog}
                    disabled={isSubmitting || page.isRejecting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    loading={isSubmitting || page.isRejecting}
                    disabled={isSubmitting || page.isRejecting}
                  >
                    Reject
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </PageContent>
  )
}
