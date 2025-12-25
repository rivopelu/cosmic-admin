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
        <div className="flex items-center gap-3">
          <AppAvatar src={data.profile_picture} alt={data.name} />
          <div>
            <div className="font-semibold text-gray-900">{data.name}</div>
            <div className="text-xs text-gray-500">@{data.username}</div>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Email',
      component: (data: IResAccountList) => (
        <div className="text-gray-700">{data.email}</div>
      ),
    },
    {
      headerTitle: 'Role',
      component: (data: IResAccountList) => (
        <Badge variant="outline" className="font-medium">
          {data.role}
        </Badge>
      ),
    },
    {
      headerTitle: 'Created Date',
      sortParam: 'created_date',
      component: (data: IResAccountList) => (
        <div className="text-gray-600">
          {DateHelper.toFormatDate(data.created_date, 'MMM dd, yyyy')}
          <div className="text-xs text-gray-400">
            {DateHelper.toFormatDate(data.created_date, 'HH:mm:ss')}
          </div>
        </div>
      ),
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
      {/* Page Header */}
      <div className="mb-6">
        <PageTitle title="Account Management" />
        <p className="text-sm text-gray-600 mt-1">
          Manage and monitor all user accounts in the system
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center gap-4">
        <InputSearch
          handleSearch={page.handleSearch}
          searchValue={page.searchValue}
          setSearchValue={page.setSearchValue}
          placeholder="Search by name, username, or email..."
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
                placeholder="Select Role"
                options={page?.dataFilterRole || []}
              />
              <InputSelect
                name="status"
                label="Account Status"
                placeholder="Select Status"
                options={page?.dataFilterStatus || []}
              />
            </Form>
          </Formik>
        </FilterList>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <AppTable
          data={page?.dataList || []}
          column={tableColumn}
          loading={page?.queryList.isLoading}
          onSort={page.handleSort}
          currentSort={page.search?.sort}
        />
        <AppPagination
          dataPagination={page.queryList?.data?.paginated_data}
          onPaginationChange={(e) => page.handlePaginationChange(e)}
        />
      </div>
    </PageContent>
  )
}
