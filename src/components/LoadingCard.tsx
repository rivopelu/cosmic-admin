import { Card, CardContent, CardTitle } from './ui/card'
import { Spinner } from './ui/spinner'

export default function LoadingCard(props: IProps) {
  const count = props.count || 1
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index}>
          <CardContent>
            <CardContent>
              <div className="w-full flex items-center justify-center h-24 gap-2">
                <Spinner />
                <CardTitle>Loading</CardTitle>
              </div>
            </CardContent>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

interface IProps {
  count?: number
}
