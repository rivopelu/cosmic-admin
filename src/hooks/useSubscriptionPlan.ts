import { SubscriptionRepository } from '@/repositories/subscription.repository'
import type { IFilterSubscriptionPlan } from '@/types/types/IFilterSubscriptionPlan'
import { useQuery } from '@tanstack/react-query'

const subscriptionRepository = new SubscriptionRepository()

export const useSubscriptionPlan = (filter: IFilterSubscriptionPlan) => {
  return useQuery({
    queryKey: ['subscription-plans', filter],
    queryFn: () => subscriptionRepository.getSubscriptionPlanList(filter),
  })
}

export const useSubscriptionPlanDetail = (id: string) => {
  return useQuery({
    queryKey: ['subscription-plan-detail', id],
    queryFn: () => subscriptionRepository.getSubscriptionPlanDetail(id),
    enabled: !!id,
  })
}
