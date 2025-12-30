import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { CreatorProductRepository } from '@/repositories/creator-product.repository'

export function useCreatorProductDetailPage() {
  const { id } = useParams({ strict: false })
  const creatorProductRepository = new CreatorProductRepository()

  const queryDetailProduct = useQuery({
    queryKey: ['detail_creator_product', id],
    queryFn: async () => {
      if (!id) return undefined
      return await creatorProductRepository.getCreatorProductDetail(id)
    },
    enabled: !!id,
  })

  return {
    queryDetailProduct,
  }
}
