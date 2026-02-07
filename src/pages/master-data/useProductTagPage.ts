import { useMutation, useQuery } from '@tanstack/react-query'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import type { IResProductTag } from '@/types/response/IResProductTag'
import { toast } from 'sonner'
import type { FormikHelpers } from 'formik'

export function useProductTagPage() {
  const masterDataRepository = new MasterDataRepository()

  const [isOpenCreateEdit, setIsOpenCreateEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IResProductTag | null>(null)

  const queryList = useQuery({
    queryKey: ['list_product_tags'],
    queryFn: async () => await masterDataRepository.getProductTags(),
  })

  const mutationCreate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.createProductTag(values),
    onSuccess: () => {
      toast.success('Product tag created successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.updateProductTag(
        selectedItem?.id || '',
        values,
      ),
    onSuccess: () => {
      toast.success('Product tag updated successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async () =>
      await masterDataRepository.deleteProductTag(selectedItem?.id || ''),
    onSuccess: () => {
      toast.success('Product tag deleted successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const handleCreate = () => {
    setSelectedItem(null)
    setIsOpenCreateEdit(true)
  }

  const handleEdit = (item: IResProductTag) => {
    setSelectedItem(item)
    setIsOpenCreateEdit(true)
  }

  const handleDelete = (item: IResProductTag) => {
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
