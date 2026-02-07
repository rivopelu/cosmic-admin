import type { ITableColumn } from '@/components/AppTable'
import AppTable from '@/components/AppTable'
import InputText from '@/components/InputText'
import InputTextArea from '@/components/InputTextArea'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { IResProductReviewReason } from '@/types/response/IResProductReviewReason'
import { Form, Formik } from 'formik'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import * as Yup from 'yup'
import { useProductReviewReasonPage } from './useProductReviewReasonPage'

export default function ProductReviewReasonPage() {
  const page = useProductReviewReasonPage()

  const tableColumn: Array<ITableColumn<IResProductReviewReason>> = [
    {
      headerTitle: 'Title',
      component: (data: IResProductReviewReason) => (
        <div className="font-semibold text-foreground">{data.title}</div>
      ),
    },
    {
      headerTitle: 'Description',
      component: (data: IResProductReviewReason) => (
        <div className="text-muted-foreground">{data.description}</div>
      ),
    },
    {
      headerTitle: 'ID',
      component: (data: IResProductReviewReason) => (
        <Badge variant="outline" className="font-mono text-xs">
          {data.id}
        </Badge>
      ),
    },
    {
      headerTitle: '',
      component: (data: IResProductReviewReason) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => page.handleEdit(data)}
          >
            <Edit2 className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => page.handleDelete(data)}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  })

  return (
    <PageContent>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <PageTitle
          title="Product Review Reason Management"
          description="Manage product review reasons for creator products"
        />
        <Button onClick={page.handleCreate}>
          <Plus className="mr-2 size-4" />
          Create Review Reason
        </Button>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <AppTable
          data={page?.dataList || []}
          column={tableColumn}
          loading={page?.queryList.isLoading}
        />
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={page.isOpenCreateEdit}
        onOpenChange={page.handleCloseDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {page.selectedItem
                ? 'Edit Review Reason'
                : 'Create Review Reason'}
            </DialogTitle>
            <DialogDescription>
              {page.selectedItem
                ? 'Edit the details of the review reason below.'
                : 'Fill in the details to create a new review reason.'}
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={page.initialValues}
            validationSchema={validationSchema}
            onSubmit={page.handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputText
                  label="Title"
                  name="title"
                  placeholder="Enter title"
                />
                <InputTextArea
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={page.handleCloseDialog}
                    disabled={
                      isSubmitting ||
                      page.mutationCreate.isPending ||
                      page.mutationUpdate.isPending
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={
                      isSubmitting ||
                      page.mutationCreate.isPending ||
                      page.mutationUpdate.isPending
                    }
                    disabled={
                      isSubmitting ||
                      page.mutationCreate.isPending ||
                      page.mutationUpdate.isPending
                    }
                  >
                    {page.selectedItem ? 'Save Changes' : 'Create'}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={page.isOpenDelete} onOpenChange={page.handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review Reason</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review reason? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={page.handleCloseDialog}>
              Cancel
            </Button>
            <Button
              color="destructive"
              onClick={() => page.mutationDelete.mutate()}
              disabled={page.mutationDelete.isPending}
              loading={page.mutationDelete.isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContent>
  )
}
