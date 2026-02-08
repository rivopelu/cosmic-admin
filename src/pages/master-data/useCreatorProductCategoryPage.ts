import { useMutation, useQuery } from '@tanstack/react-query'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import type { IResCreatorProductCategory } from '@/types/response/IResCreatorProductCategory'
import type { FormikHelpers } from 'formik'
import { toast } from 'sonner'

export function useCreatorProductCategoryPage() {
  const masterDataRepository = new MasterDataRepository()

  const [isOpenCreateEdit, setIsOpenCreateEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] =
    useState<IResCreatorProductCategory | null>(null)

  const queryList = useQuery({
    queryKey: ['list_creator_product_categories_1'],
    queryFn: async () =>
      await masterDataRepository.getCreatorProductCategories(),
  })

  const mutationCreate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.createCreatorProductCategory(values),
    onSuccess: () => {
      toast.success('Category created successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.updateCreatorProductCategory(
        selectedItem?.id || '',
        values,
      ),
    onSuccess: () => {
      toast.success('Category updated successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async () =>
      await masterDataRepository.deleteCreatorProductCategory(
        selectedItem?.id || '',
      ),
    onSuccess: () => {
      toast.success('Category deleted successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const handleCreate = () => {
    setSelectedItem(null)
    setIsOpenCreateEdit(true)
  }

  const handleEdit = (item: IResCreatorProductCategory) => {
    setSelectedItem(item)
    setIsOpenCreateEdit(true)
  }

  const handleDelete = (item: IResCreatorProductCategory) => {
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
