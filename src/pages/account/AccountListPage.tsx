import AppAvatar from '@/components/AppAvatar'
import AppPagination from '@/components/AppPagination'
import type { ITableColumn } from '@/components/AppTable'
import AppTable from '@/components/AppTable'
import FilterList from '@/components/FilterList'
import InputSearch from '@/components/InputSearch'
import InputSelect from '@/components/InputSelect'
import PageContent from '@/components/PageContent'
import PageTitle from '@/components/PageTitle'
import { Badge } from '@/components/ui/badge'
import type { IResAccountList } from '@/types/response/IResAccountList'
import DateHelper from '@/utils/date-helper'
import { Form, Formik } from 'formik'
import { useAccountListPage } from './useAccountListPage'

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
      headerTitle: 'Role',
      component: (data: IResAccountList) => data.role,
    },
    {
      headerTitle: 'Created Date',
      component: (data: IResAccountList) =>
        DateHelper.toFormatDate(data.created_date, 'yyyy-MM-dd HH:mm:ss'),
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
          active={!!page.activeFilter}
          open={page.openFilter}
          onOpenChange={page.setOpenFilter}
          onReset={page.handleResetSearch}
          onSubmit={() => {
            const form = document.getElementById(
              'filter-form',
            ) as HTMLFormElement
            form?.requestSubmit()
          }}
        >
          <Formik
            initialValues={{
              role: page.filterData.role,
              status: page.filterData.status,
            }}
            onSubmit={page.handleFilterApply}
          >
            <Form id="filter-form" className="space-y-4">
              <InputSelect
                name="role"
                label="Account Role"
                placeholder="Pilih Role"
                options={page?.dataFilterRole || []}
              />
              <InputSelect
                name="status"
                label="Account Status"
                placeholder="Pilih Status"
                options={page?.dataFilterStatus || []}
              />
            </Form>
          </Formik>
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
