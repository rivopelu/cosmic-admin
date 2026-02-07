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
import type { IResProductTagCategory } from '@/types/response/IResProductTagCategory'
import { Form, Formik } from 'formik'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import * as Yup from 'yup'
import { useProductTagCategoryPage } from './useProductTagCategoryPage'

export default function ProductTagCategoryPage() {
  const page = useProductTagCategoryPage()

  const tableColumn: Array<ITableColumn<IResProductTagCategory>> = [
    {
      headerTitle: 'Name',
      component: (data: IResProductTagCategory) => (
        <div>
          <div className="font-semibold text-foreground">{data.name}</div>
          <div className="text-xs text-muted-foreground">{data.slug}</div>
        </div>
      ),
    },
    {
      headerTitle: 'Description',
      component: (data: IResProductTagCategory) => (
        <div className="text-muted-foreground">{data.description || '-'}</div>
      ),
    },
    {
      headerTitle: 'ID',
      component: (data: IResProductTagCategory) => (
        <Badge variant="outline" className="font-mono text-xs">
          {data.id}
        </Badge>
      ),
    },
    {
      headerTitle: '',
      component: (data: IResProductTagCategory) => (
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
    name: Yup.string()
      .required('Name is required')
      .max(255, 'Name must be at most 255 characters'),
    description: Yup.string().optional(),
  })

  return (
    <PageContent>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <PageTitle
          title="Product Tag Category Management"
          description="Manage and monitor all product tag categories in the system"
        />
        <Button onClick={page.handleCreate}>
          <Plus className="mr-2 size-4" />
          Create Product Tag Category
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
                ? 'Edit Product Tag Category'
                : 'Create Product Tag Category'}
            </DialogTitle>
            <DialogDescription>
              {page.selectedItem
                ? 'Edit the details of the product tag category below.'
                : 'Fill in the details to create a new product tag category.'}
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={page.initialValues}
            validationSchema={validationSchema}
            onSubmit={page.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputText label="Name" name="name" placeholder="Enter name" />
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
            <DialogTitle>Delete Product Tag Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product tag category? This
              action cannot be undone.
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
