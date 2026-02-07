import type { AccountRoleType } from '@/types/types/IAccount'

interface IProps {
  role: AccountRoleType
  text?: string
}

export default function AccountRoleText({ role, text }: IProps) {
  const roleConfig: Record<AccountRoleType, { color: string; label: string }> =
    {
      ADMIN: {
        color: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]',
        label: 'Admin',
      },
      CREATOR: {
        color: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]',
        label: 'Creator',
      },
      USER: {
        color: 'bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.6)]',
        label: 'User',
      },
    }

  const config = roleConfig[role]

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${config?.color}`} />
      <span className="text-sm font-medium">{text || config?.label}</span>
    </div>
  )
}
