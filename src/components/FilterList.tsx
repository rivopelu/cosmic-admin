import { Filter, ListFilter, X } from 'lucide-react'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { Separator } from './ui/separator'

interface Iprops {
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onReset?: () => void
  onSubmit?: () => void
  children?: React.ReactNode
}

export default function FilterList(props: Iprops) {
  return (
    <Drawer
      direction="right"
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 ">
          <Filter className="size-4" />
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>{props.title ?? 'Filter'}</DrawerTitle>
            <DrawerClose asChild>
              <Button size="icon" variant="ghost">
                <X />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            {props.description ?? 'Pilih kriteria untuk menyaring data'}
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <div className="p-4">{props.children}</div>{' '}
        {/* Area untuk isian filter */}
        <DrawerFooter>
          <div className="grid gap-2 grid-cols-2">
            <DrawerClose asChild>
              <Button variant="outline" onClick={props.onReset}>
                RESET
              </Button>
            </DrawerClose>
            <Button onClick={props.onSubmit}>TERAPKAN</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
