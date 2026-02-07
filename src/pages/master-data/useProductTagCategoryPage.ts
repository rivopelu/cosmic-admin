import { useMutation, useQuery } from '@tanstack/react-query'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import type { IResProductTagCategory } from '@/types/response/IResProductTagCategory'
import { toast } from 'sonner'
import type { FormikHelpers } from 'formik'

export function useProductTagCategoryPage() {
  const masterDataRepository = new MasterDataRepository()

  const [isOpenCreateEdit, setIsOpenCreateEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] =
    useState<IResProductTagCategory | null>(null)

  const queryList = useQuery({
    queryKey: ['list_product_tag_categories'],
    queryFn: async () => await masterDataRepository.getProductTagCategories(),
  })

  const mutationCreate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.createProductTagCategory(values),
    onSuccess: () => {
      toast.success('Product tag category created successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.updateProductTagCategory(
        selectedItem?.id || '',
        values,
      ),
    onSuccess: () => {
      toast.success('Product tag category updated successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async () =>
      await masterDataRepository.deleteProductTagCategory(
        selectedItem?.id || '',
      ),
    onSuccess: () => {
      toast.success('Product tag category deleted successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const handleCreate = () => {
    setSelectedItem(null)
    setIsOpenCreateEdit(true)
  }

  const handleEdit = (item: IResProductTagCategory) => {
    setSelectedItem(item)
    setIsOpenCreateEdit(true)
  }

  const handleDelete = (item: IResProductTagCategory) => {
    setSelectedItem(item)
    setIsOpenDelete(true)
  }

  const handleCloseDialog = () => {
    setIsOpenCreateEdit(false)
    setIsOpenDelete(false)
    setSelectedItem(null)
  }

  const initialValues = {
    name: selectedItem?.name || '',
    description: selectedItem?.description || '',
  }

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>,
  ) => {
    if (selectedItem) {
      await mutationUpdate.mutateAsync(values)
    } else {
      await mutationCreate.mutateAsync(values)
    }
    formikHelpers.setSubmitting(false)
  }

  const dataList = queryList.data || []

  return {
    dataList,
    queryList,
    isOpenCreateEdit,
    isOpenDelete,
    selectedItem,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseDialog,
    initialValues,
    handleSubmit,
    mutationDelete,
    mutationCreate,
    mutationUpdate,
  }
}
