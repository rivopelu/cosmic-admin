import type { ITableColumn } from '@/components/AppTable'
import { useAccountListPage } from './useAccountListPage'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import type { IResAccountList } from '@/types/response/IResAccountList'
import { Badge } from '@/components/ui/badge'
import AppTable from '@/components/AppTable'
import AppAvatar from '@/components/AppAvatar'

export default function AccountListPage() {
  const page = useAccountListPage()

  const tableColumn: Array<ITableColumn<IResAccountList>> = [
    {
      headerTitle: 'Name',
      component: (data: IResAccountList) => (
        <div className="flex items-center gap-2">
          <AppAvatar src={data.profile_picture} alt={data.name} />
          <div className="font-semibold">{data.name}</div>
        </div>
      ),
    },
    {
      headerTitle: 'Username',
      component: (data: IResAccountList) => data.username,
    },
    {
      headerTitle: 'Email',
      component: (data: IResAccountList) => data.email,
    },
    {
      headerTitle: 'Status',
      component: (data: IResAccountList) => (
        <Badge variant={data.status === 'VERIFIED' ? 'default' : 'secondary'}>
          {data.status_string}
        </Badge>
      ),
    },
  ]

  return (
    <PageContent>
      <PageTitle title="Account List" />
      <AppTable
        data={page?.dataList || []}
        column={tableColumn}
        loading={page?.queryList.isLoading}
      />
    </PageContent>
  )
}
