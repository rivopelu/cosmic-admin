import { Search, Trash } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function InputSearch(props: IProps) {
  return (
    <div onSubmit={props.handleSearch} className="w-full flex gap-2 max-w-sm">
      <div className="relative flex-1">
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter' && props.handleSearch) {
              props.handleSearch()
            }
          }}
          placeholder={props.placeholder || 'Masukan pencarian...'}
          value={props.searchValue}
          onChange={(e) =>
            props.setSearchValue && props.setSearchValue(e.target.value)
          }
          className="pl-10 bg-card"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      {props.active && (
        <Button
          size={'icon'}
          type="button"
          color={'destructive'}
          onClick={props.handleReset}
        >
          <Trash />
        </Button>
      )}
      {props.handleSearch && (
        <Button type="button" onClick={props.handleSearch}>
          Cari
        </Button>
      )}
    </div>
  )
}

interface IProps {
  handleSearch?: () => void
  searchValue?: string
  setSearchValue: (value: string) => void
  placeholder?: string
  active?: boolean
  handleReset?: () => void
}
