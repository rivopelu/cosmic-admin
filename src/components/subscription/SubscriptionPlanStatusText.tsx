interface IProps {
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'REJECTED'
  text?: string
}

export default function SubscriptionPlanStatusText({ status, text }: IProps) {
  const statusConfig: Record<
    'ACTIVE' | 'INACTIVE' | 'PENDING' | 'REJECTED',
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
    PENDING: {
      color: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
      label: 'Pending',
    },
    REJECTED: {
      color: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
      label: 'Rejected',
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
