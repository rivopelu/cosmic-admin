import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type IBreadcrumbData,
} from '@/components/Breadcrumbs'
import { ROUTES } from '@/constants/routes'
import { Fragment } from 'react'

export default function PageTitle(props: IProps) {
  const dataBreadcrumb: IBreadcrumbData[] = [
    { path: ROUTES.HOME(), label: 'Dashboard' },
    ...(props.breadcrumb || []),
  ]
  return (
    <div>
      <div className="flex  gap-2 flex-col items-start">
        <h1 className={'capitalize text-2xl'}>{props.title}</h1>
        {props.description && (
          <p className="text-muted-foreground text-sm">{props.description}</p>
        )}
      </div>
      {props.breadcrumb && (
        <Breadcrumb className={'mt-2'}>
          <BreadcrumbList>
            {dataBreadcrumb.map((item: IBreadcrumbData, index) => (
              <Fragment key={index}>
                {index !== 0 && <BreadcrumbSeparator />}
                {index + 1 !== dataBreadcrumb.length ? (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.path}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  )
}

interface IProps {
  title: string
  description?: string
  breadcrumb?: IBreadcrumbData[]
}
