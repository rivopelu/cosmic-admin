import { useSubscriptionPlanDetail } from '@/hooks/useSubscriptionPlan.ts'
import { useSubscriptionPlanActions } from '@/hooks/useSubscriptionPlanActions.ts'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

export type SubscriptionPlanDialogType = 'APPROVE' | 'REJECT' | null

export function useSubscriptionPlanDetailPage() {
  const { id } = useParams({ from: '/subscription-plan/$id' })
  const [openDialog, setOpenDialog] = useState<SubscriptionPlanDialogType>(null)

  const queryDetail = useSubscriptionPlanDetail(id)
  const {
    approveSubscriptionPlan,
    isApproving,
    rejectSubscriptionPlan,
    isRejecting,
  } = useSubscriptionPlanActions()

  const handleApprove = async () => {
    await approveSubscriptionPlan(id)
    setOpenDialog(null)
  }

  const handleReject = async (reason: string) => {
    await rejectSubscriptionPlan({ id, reason })
    setOpenDialog(null)
  }

  const onCloseDialog = () => setOpenDialog(null)

  return {
    queryDetail,
    openDialog,
    setOpenDialog,
    onCloseDialog,
    handleApprove,
    handleReject,
    isApproving,
    isRejecting,
    id,
  }
}
