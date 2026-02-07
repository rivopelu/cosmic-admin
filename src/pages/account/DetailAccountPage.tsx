import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import LoadingCard from '@/components/LoadingCard'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  AlertCircle,
  Clock,
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  Palette,
  Link as LinkIcon,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import DateHelper from '@/utils/date-helper'
import AppAvatar from '@/components/AppAvatar'
import { Badge } from '@/components/ui/badge'

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

  function getStatusBadge() {
    const statusMap = {
      ACTIVE: {
        color:
          'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
        label: 'Active',
      },
      INACTIVE: {
        color:
          'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
        label: 'Inactive',
      },
      WAITING_EMAIL_VERIFICATION: {
        color:
          'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900',
        label: 'Waiting Email Verification',
      },
      WAITING_APPROVAL_CREATOR: {
        color:
          'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
        label: 'Waiting Approval',
      },
    }

    const status = statusMap[data?.status as keyof typeof statusMap]
    return (
      <Badge className={status?.color || ''} variant="outline">
        {status?.label || data?.status_string}
      </Badge>
    )
  }

  function getRoleBadge() {
    const roleMap = {
      ADMIN: {
        color:
          'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900',
        label: 'Admin',
      },
      CREATOR: {
        color:
          'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-900',
        label: 'Creator',
      },
      USER: {
        color:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        label: 'User',
      },
    }

    const role = roleMap[data?.role_enum as keyof typeof roleMap]
    return (
      <Badge className={role?.color || ''} variant="outline">
        {role?.label || data?.role_enum}
      </Badge>
    )
  }

  function dialogReject() {
    return (
      <Dialog
        open={page.showModal == 'REJECT'}
        onOpenChange={page.onCloseModal}
      >
        <DialogContent>
          <DialogTitle>Reject Creator Application</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this creator application. This
            will be visible to the user.
          </DialogDescription>
          <FormikProvider value={page.formikReason}>
            <div className="space-y-4 mt-4">
              <InputText
                placeholder="e.g., Portfolio does not meet quality standards"
                label="Rejection Reason"
                name="reason"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={page.onCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => page.formikReason.handleSubmit()}
                  loading={page.mutationReject.isPending}
                  color="destructive"
                  type="submit"
                >
                  Reject Application
                </Button>
              </div>
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
          <DialogTitle>Approve Creator Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this account as a creator? This
            action will grant them creator privileges.
          </DialogDescription>

          <div className="flex gap-2 justify-end mt-4">
            <Button type="button" variant="outline" onClick={page.onCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={() => page.mutationApprove.mutate()}
              loading={page.mutationApprove.isPending}
              color="success"
              type="submit"
            >
              Approve Application
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
      <PageContent className="grid gap-6">
        <div className="flex justify-between items-start">
          <PageTitle
            description="View and manage account details"
            title="Account Details"
            breadcrumb={breadcrumbs}
          />
          {data?.status === 'WAITING_APPROVAL_CREATOR' && (
            <div className="flex gap-2">
              <Button
                onClick={() => page.setShowModal('REJECT')}
                variant="outline"
                color="destructive"
              >
                <XCircle className="size-4" />
                Reject
              </Button>
              <Button
                variant="solid"
                color="success"
                onClick={() => page.setShowModal('APPROVE')}
              >
                <CheckCircle2 className="size-4" />
                Approve
              </Button>
            </div>
          )}
        </div>

        {/* Rejection Alert */}
        {data?.reject_reason && data?.status !== 'WAITING_APPROVAL_CREATOR' && (
          <Alert className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900">
            <AlertCircle className="text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-800 dark:text-red-300 font-semibold">
              Creator Application Rejected
            </AlertTitle>
            <AlertDescription className="mt-2 text-red-700 dark:text-red-400">
              <p className="mb-3">{data?.reject_reason}</p>
              <Separator className="my-3 bg-red-200 dark:bg-red-800" />
              <div className="flex gap-6 text-sm text-red-600 dark:text-red-400">
                <div className="flex items-center gap-1.5">
                  <User size={14} />
                  <span>Rejected by: {data?.reject_by}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>
                    {DateHelper.toFormatDate(
                      data?.reject_date,
                      'dd MMMM yyyy, HH:mm',
                    )}
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Approval Alert */}
        {data?.approve_by && data?.role_enum === 'CREATOR' && (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
            <CheckCircle2 className="text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300 font-semibold">
              Creator Application Approved
            </AlertTitle>
            <AlertDescription className="mt-2 text-green-700 dark:text-green-400">
              <p className="mb-3">
                This account has been approved as a creator and can now publish
                content.
              </p>
              <Separator className="my-3 bg-green-200 dark:bg-green-800" />
              <div className="flex gap-6 text-sm text-green-600 dark:text-green-400">
                <div className="flex items-center gap-1.5">
                  <User size={14} />
                  <span>Approved by: {data?.approve_by}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>
                    {DateHelper.toFormatDate(
                      data?.approve_date,
                      'dd MMMM yyyy, HH:mm',
                    )}
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Header Card */}
        <Card>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <AppAvatar
                      src={data?.profile_picture || ''}
                      alt={data?.name || ''}
                    />
                    <h2 className="text-2xl font-bold">{data?.name}</h2>
                  </div>
                  {getRoleBadge()}
                  {getStatusBadge()}
                </div>
                <p className="text-muted-foreground mb-1">@{data?.username}</p>
                {data?.artist_name && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Palette size={14} />
                    <span>Artist Name: {data?.artist_name}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail size={16} className="text-muted-foreground" />
                  <p className="text-sm">{data?.email}</p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Username
                </label>
                <p className="text-sm mt-1">@{data?.username}</p>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Role
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <Shield size={16} className="text-muted-foreground" />
                  {getRoleBadge()}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Status
                </label>
                <div className="mt-1.5">{getStatusBadge()}</div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Information */}
          {(data?.creator_type_name || data?.artist_name) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette size={18} />
                  Creator Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data?.artist_name && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Artist Name
                      </label>
                      <p className="text-sm mt-1">{data?.artist_name}</p>
                    </div>
                    <Separator />
                  </>
                )}

                {data?.creator_type_name && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Creator Type
                    </label>
                    <p className="text-sm mt-1">{data?.creator_type_name}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={18} />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Created
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={16} className="text-muted-foreground" />
                  <p className="text-sm">
                    {DateHelper.toFormatDate(
                      data?.created_date,
                      'dd MMMM yyyy, HH:mm',
                    )}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={16} className="text-muted-foreground" />
                  <p className="text-sm">
                    {DateHelper.toFormatDate(
                      data?.updated_date,
                      'dd MMMM yyyy, HH:mm',
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {data?.social_media_list && data.social_media_list.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LinkIcon size={18} />
                  Social Media
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-2">
                {data.social_media_list.map((social, index) => (
                  <div key={index}>
                    <label className="text-sm font-medium text-muted-foreground">
                      {social.type}
                    </label>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 block"
                    >
                      {social.url}
                    </a>
                    {index < data.social_media_list.length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </PageContent>
    </>
  )
}
