import { SubscriptionRepository } from '@/repositories/subscription.repository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const subscriptionRepository = new SubscriptionRepository()

export const useSubscriptionPlanActions = () => {
  const queryClient = useQueryClient()

  const approveMutation = useMutation({
    mutationFn: (id: string) =>
      subscriptionRepository.approveSubscriptionPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] })
      queryClient.invalidateQueries({ queryKey: ['subscription-plan-detail'] })
      toast.success('Subscription plan approved successfully')
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to approve subscription plan',
      )
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      subscriptionRepository.rejectSubscriptionPlan(id, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] })
      queryClient.invalidateQueries({ queryKey: ['subscription-plan-detail'] })
      toast.success('Subscription plan rejected successfully')
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to reject subscription plan',
      )
    },
  })

  return {
    approveSubscriptionPlan: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
    rejectSubscriptionPlan: rejectMutation.mutateAsync,
    isRejecting: rejectMutation.isPending,
  }
}
