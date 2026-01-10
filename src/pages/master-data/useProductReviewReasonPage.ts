import { useMutation, useQuery } from '@tanstack/react-query'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import type { IResProductReviewReason } from '@/types/response/IResProductReviewReason'
import { toast } from 'sonner'
import type { FormikHelpers } from 'formik'

export function useProductReviewReasonPage() {
  const masterDataRepository = new MasterDataRepository()

  const [isOpenCreateEdit, setIsOpenCreateEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] =
    useState<IResProductReviewReason | null>(null)

  const queryList = useQuery({
    queryKey: ['list_product_review_reasons'],
    queryFn: async () => await masterDataRepository.getProductReviewReasons(),
  })

  const mutationCreate = useMutation({
    mutationFn: async (values: { title: string; description: string }) =>
      await masterDataRepository.createProductReviewReason(values),
    onSuccess: () => {
      toast.success('Product review reason created successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (values: { title: string; description: string }) =>
      await masterDataRepository.updateProductReviewReason(
        selectedItem?.id || '',
        values,
      ),
    onSuccess: () => {
      toast.success('Product review reason updated successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async () =>
      await masterDataRepository.deleteProductReviewReason(
        selectedItem?.id || '',
      ),
    onSuccess: () => {
      toast.success('Product review reason deleted successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const handleCreate = () => {
    setSelectedItem(null)
    setIsOpenCreateEdit(true)
  }

  const handleEdit = (item: IResProductReviewReason) => {
    setSelectedItem(item)
    setIsOpenCreateEdit(true)
  }

  const handleDelete = (item: IResProductReviewReason) => {
    setSelectedItem(item)
    setIsOpenDelete(true)
  }

  const handleCloseDialog = () => {
    setIsOpenCreateEdit(false)
    setIsOpenDelete(false)
    setSelectedItem(null)
  }

  const initialValues = {
    title: selectedItem?.title || '',
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
