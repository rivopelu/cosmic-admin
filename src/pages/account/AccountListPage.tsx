import type { ITableColumn } from '@/components/AppTable'
import { useAccountListPage } from './useAccountListPage'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import type { IResAccountList } from '@/types/response/IResAccountList'
import { Badge } from '@/components/ui/badge'
import AppTable from '@/components/AppTable'
import AppAvatar from '@/components/AppAvatar'
import AppPagination from '@/components/AppPagination'
import FilterList from '@/components/FilterList'
import InputSearch from '@/components/InputSearch'

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
      <div className="flex justify-between items-center">
        <InputSearch
          handleSearch={page.handleSearch}
          searchValue={page.searchValue}
          setSearchValue={page.setSearchValue}
          placeholder="Cari account..."
          active={!!page.searchValue}
          handleReset={page.handleResetSearch}
        />
        <FilterList
          open={page.openFilter}
          onOpenChange={page.setOpenFilter}
          onReset={page.handleResetSearch}
          onSubmit={() => {}}
        >
          <div>{JSON.stringify(page.dataFilterRole)}</div>
        </FilterList>
      </div>
      <AppTable
        data={page?.dataList || []}
        column={tableColumn}
        loading={page?.queryList.isLoading}
      />
      <AppPagination
        dataPagination={page.queryList?.data?.paginated_data}
        onPaginationChange={(e) => page.handlePaginationChange(e)}
      />
    </PageContent>
  )
}
