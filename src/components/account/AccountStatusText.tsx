import type { AccountStatusType } from '@/types/types/IAccount'

interface IProps {
  status: AccountStatusType
  text?: string
}

export default function AccountStatusText({ status, text }: IProps) {
  const statusConfig: Record<
    AccountStatusType,
    { color: string; label: string }
  > = {
    ACTIVE: {
      color: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
      label: 'Active',
    },
    INACTIVE: {
      color: 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]',
      label: 'Inactive',
    },
    WAITING_EMAIL_VERIFICATION: {
      color: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
      label: 'Waiting Email Verification',
    },
    WAITING_APPROVAL_CREATOR: {
      color: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]',
      label: 'Waiting Approval',
    },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${config?.color}`} />
      <span className="text-sm font-medium">{text || config?.label}</span>
    </div>
  )
}
