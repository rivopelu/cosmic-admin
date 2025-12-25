import { Card, CardContent } from '@/components/ui/card.tsx'
import { ASSETS } from '@/constants/assets'

export default function CardEmpty() {
  return (
    <Card>
      <CardContent>
        <div
          className={'min-h-96 flex items-center justify-center flex-col gap-4'}
        >
          <img src={ASSETS.IL_EMPTY_STATE} alt={'empty state'} />
          <div className={'text-muted-foreground'}>
            Tidak ada data yang ditemukan
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
