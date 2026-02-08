import { useMutation, useQuery } from '@tanstack/react-query'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import type { IResCreatorType } from '@/types/response/IResCreatorType'
import { toast } from 'sonner'
import type { FormikHelpers } from 'formik'

export function useCreatorTypePage() {
  const masterDataRepository = new MasterDataRepository()

  const [isOpenCreateEdit, setIsOpenCreateEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IResCreatorType | null>(null)

  const queryList = useQuery({
    queryKey: ['list_creator_types'],
    queryFn: async () => await masterDataRepository.getCreatorTypes(),
  })

  const mutationCreate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.createCreatorType(values),
    onSuccess: () => {
      toast.success('Creator type created successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (values: any) =>
      await masterDataRepository.updateCreatorType(
        selectedItem?.id || '',
        values,
      ),
    onSuccess: () => {
      toast.success('Creator type updated successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async () =>
      await masterDataRepository.deleteCreatorType(selectedItem?.id || ''),
    onSuccess: () => {
      toast.success('Creator type deleted successfully')
      queryList.refetch()
      handleCloseDialog()
    },
  })

  const handleCreate = () => {
    setSelectedItem(null)
    setIsOpenCreateEdit(true)
  }

  const handleEdit = (item: IResCreatorType) => {
    setSelectedItem(item)
    setIsOpenCreateEdit(true)
  }

  const handleDelete = (item: IResCreatorType) => {
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
