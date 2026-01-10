import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { CreatorProductRepository } from '@/repositories/creator-product.repository'
import MasterDataRepository from '@/repositories/master-data.repositories'
import { useState } from 'react'
import { toast } from 'sonner'

export interface IRejectProductForm {
  reason_id: string | null
  custom_reason: string
}

export function useCreatorProductDetailPage() {
  const { id } = useParams({ strict: false })
  const creatorProductRepository = new CreatorProductRepository()
  const masterDataRepository = new MasterDataRepository()

  const [openDialog, setOpenDialog] = useState<
    'APPROVE' | 'REJECT' | undefined
  >()

  const queryDetailProduct = useQuery({
    queryKey: ['detail_creator_product', id],
    queryFn: async () => {
      if (!id) return undefined
      return await creatorProductRepository.getCreatorProductDetail(id)
    },
    enabled: !!id,
  })

  const queryReviewReasons = useQuery({
    queryKey: ['list_product_review_reasons'],
    queryFn: async () => await masterDataRepository.getProductReviewReasons(),
  })

  const mutationReject = useMutation({
    mutationFn: async (data: IRejectProductForm) => {
      if (!id) throw new Error('Product ID not found')
      return await creatorProductRepository.rejectCreatorProduct(id, data)
    },
    onSuccess: () => {
      toast.success('Product rejected successfully')
      queryDetailProduct.refetch()
      onCloseDialog()
    },
  })

  function onCloseDialog() {
    setOpenDialog(undefined)
  }

  const reviewReasonOptions =
    queryReviewReasons.data?.map((item) => ({
      label: item.title,
      value: item.id,
    })) || []

  return {
    queryDetailProduct,
    queryReviewReasons,
    reviewReasonOptions,
    openDialog,
    setOpenDialog,
    onCloseDialog,
    mutationReject,
  }
}
