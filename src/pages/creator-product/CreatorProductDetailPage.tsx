import type { IBreadcrumbData } from '@/components/Breadcrumbs'
import InputSelect from '@/components/InputSelect'
import InputTextArea from '@/components/InputTextArea'
import LoadingCard from '@/components/LoadingCard'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Badge } from '@/components/ui/badge'
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
  DollarSign,
  FileText,
  Hash,
  Image as ImageIcon,
  Package,
  Percent,
  Tag,
} from 'lucide-react'
import * as Yup from 'yup'
import {
  useCreatorProductDetailPage,
  type IRejectProductForm,
} from './useCreatorProductDetailPage'

export default function CreatorProductDetailPage() {
  const page = useCreatorProductDetailPage()
  const data = page.queryDetailProduct.data

  const breadcrumbs: IBreadcrumbData[] = [
    {
      label: 'Creator Product',
      path: ROUTES.CREATOR_PRODUCT_LIST(),
    },
    {
      label: data?.name || '',
    },
  ]

  const getStatusBadge = () => {
    const statusMap = {
      PUBLISHED: {
        color:
          'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
        label: 'Published',
      },
      DRAFT: {
        color:
          'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
        label: 'Draft',
      },
      PENDING: {
        color:
          'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900',
        label: 'Pending',
      },
      REJECTED: {
        color:
          'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900',
        label: 'Rejected',
      },
      DELETED: {
        color:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        label: 'Deleted',
      },
      ARCHIVED: {
        color:
          'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
        label: 'Archived',
      },
    }

    const status = statusMap[data?.status as keyof typeof statusMap]
    return (
      <Badge className={status?.color || ''} variant="outline">
        {status?.label || data?.status}
      </Badge>
    )
  }

  const calculateDiscountedPrice = () => {
    if (!data?.discount || !data?.price) return null

    if (data.discount_type === 'PERCENTAGE') {
      return data.price - (data.price * data.discount) / 100
    } else if (data.discount_type === 'FIXED') {
      return data.price - data.discount
    }
    return null
  }

  if (page?.queryDetailProduct?.isPending)
    return (
      <PageContent>
        <LoadingCard count={4} />
      </PageContent>
    )

  function dialogApprove() {
    return (
      <Dialog
        open={page.openDialog === 'APPROVE'}
        onOpenChange={page.onCloseDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={page.onCloseDialog}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={() => page.mutationApprove.mutate()}
              loading={page.mutationApprove.isPending}
              disabled={page.mutationApprove.isPending}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const rejectValidationSchema = Yup.object().shape({
    reason_id: Yup.string().nullable(),
    custom_reason: Yup.string().when('reason_id', {
      is: (val: string | null) => !val || val === 'custom',
      then: (schema) => schema.required('Custom reason is required'),
      otherwise: (schema) => schema,
    }),
  })

  const rejectInitialValues: IRejectProductForm = {
    reason_id: null,
    custom_reason: '',
  }

  const handleRejectSubmit = async (values: IRejectProductForm) => {
    const submitData = {
      reason_id: values.reason_id === 'custom' ? null : values.reason_id,
      custom_reason: values.custom_reason,
    }
    await page.mutationReject.mutateAsync(submitData)
  }

  function dialogReject() {
    const reasonOptions = [
      ...page.reviewReasonOptions,
      { label: 'Custom Reason', value: 'custom' },
    ]

    return (
      <Dialog
        open={page.openDialog === 'REJECT'}
        onOpenChange={page.onCloseDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Product</DialogTitle>
            <DialogDescription>
              Please select a reason for rejecting this product.
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={rejectInitialValues}
            validationSchema={rejectValidationSchema}
            onSubmit={handleRejectSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-4">
                <InputSelect
                  name="reason_id"
                  label="Rejection Reason"
                  placeholder="Select a reason"
                  options={reasonOptions}
                />

                {(!values.reason_id || values.reason_id === 'custom') && (
                  <InputTextArea
                    name="custom_reason"
                    label="Custom Reason"
                    placeholder="Enter custom rejection reason"
                  />
                )}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={page.onCloseDialog}
                    disabled={isSubmitting || page.mutationReject.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="destructive"
                    loading={isSubmitting || page.mutationReject.isPending}
                    disabled={isSubmitting || page.mutationReject.isPending}
                  >
                    Reject
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <PageContent className="grid gap-6">
      {dialogApprove()}
      {dialogReject()}
      <div className="flex justify-between items-start">
        <PageTitle
          description="View and manage creator product details"
          title="Product Details"
          breadcrumb={breadcrumbs}
        />
        {data?.status === 'PENDING' && (
          <div className="flex gap-1">
            <Button
              color="destructive"
              onClick={() => page.setOpenDialog('REJECT')}
            >
              REJECT
            </Button>
            <Button
              color="success"
              onClick={() => page.setOpenDialog('APPROVE')}
            >
              APPROVE
            </Button>
          </div>
        )}
      </div>

      {/* Product Header Card */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-6">
            <img
              src={data?.image}
              alt={data?.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{data?.name}</h2>
                {getStatusBadge()}
              </div>
              <p className="text-muted-foreground mb-2">Slug: {data?.slug}</p>
              <p className="text-sm text-muted-foreground">
                Version {data?.version}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pricing Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign size={18} />
              Pricing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Base Price
              </label>
              <p className="text-lg font-semibold mt-1">
                {formatCurrency(data?.price || 0)}
              </p>
            </div>

            {data?.discount && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Percent size={14} />
                    Discount
                  </label>
                  <p className="text-sm mt-1">
                    {data.discount_type === 'PERCENTAGE'
                      ? `${data.discount}%`
                      : formatCurrency(data.discount)}
                  </p>
                </div>

                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Final Price
                  </label>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    {formatCurrency(calculateDiscountedPrice() || 0)}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Period Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={18} />
              Period
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Start Date
              </label>
              <p className="text-sm mt-1">
                {DateHelper.toFormatDate(
                  new Date(data?.period_start || '').getTime(),
                  'dd MMMM yyyy',
                )}
              </p>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                End Date
              </label>
              <p className="text-sm mt-1">
                {DateHelper.toFormatDate(
                  new Date(data?.period_end || '').getTime(),
                  'dd MMMM yyyy',
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package size={18} />
              Product Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Category ID
              </label>
              <p className="text-sm mt-1 font-mono">{data?.category_id}</p>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Hash size={14} />
                Product ID
              </label>
              <p className="text-sm mt-1 font-mono">{data?.id}</p>
            </div>
          </CardContent>
        </Card>

        {data?.tags && data.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag size={18} />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Description */}
      {data?.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText size={18} />
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {data.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Content Gallery */}
      {data?.content && data.content.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon size={18} />
              Content Gallery ({data.content.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.content
                .sort((a, b) => a.seq - b.seq)
                .map((item) => (
                  <div
                    key={item.id}
                    className="relative group rounded-lg overflow-hidden border"
                  >
                    {item.type === 'IMAGE' ? (
                      <img
                        src={item.url}
                        alt={`Content ${item.seq + 1}`}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-40 object-cover"
                        controls
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                      <div className="flex justify-between items-center">
                        <span>{item.type}</span>
                        <span>#{item.seq + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </PageContent>
  )
}
