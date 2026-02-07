import type { CreatorProductStatus } from '@/types/response/IResCreatorProduct'

interface IProps {
  status: CreatorProductStatus
  text?: string
}

export default function CreatorProductStatusText({ status, text }: IProps) {
  const statusConfig: Record<
    CreatorProductStatus,
    { color: string; label: string }
  > = {
    PUBLISHED: {
      color: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
      label: 'Published',
    },
    DRAFT: {
      color: 'bg-gray-400 shadow-[0_0_8px_rgba(156,163,175,0.6)]',
      label: 'Draft',
    },
    PENDING: {
      color: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]',
      label: 'Pending',
    },
    REJECTED: {
      color: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
      label: 'Rejected',
    },
    DELETED: {
      color: 'bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.6)]',
      label: 'Deleted',
    },
    ARCHIVED: {
      color: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]',
      label: 'Archived',
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
