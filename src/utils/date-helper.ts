import { format, subDays } from 'date-fns'

export default class DateHelper {
  public static toFormatDate(
    date: Date | number | undefined,
    formatTime: TypeFormatDate,
  ): string {
    if (!date) return ''

    if (typeof date === 'number') {
      return format(new Date(date), formatTime)
    }
    return format(new Date(date.toString()), formatTime)
  }

  public static initValue(
    range?: number,
  ): { endDate: Date; startDate: Date; key: string }[] {
    return [
      {
        startDate: subDays(new Date(), range ? range : 30),
        endDate: new Date(),
        key: 'selection',
      },
    ]
  }

  static parseDateToDuration(date: Date): string {
    const now = new Date()
    const diff = Math.abs(now.getTime() - date.getTime())

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)

    if (weeks > 0) {
      return `${weeks}w`
    } else if (days > 0) {
      return `${days}d`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${minutes}m`
    }
  }

  static parseMillisToMinutesDuration(millis: number): string {
    const now = Date.now()
    const diff = Math.abs(now - millis)

    return Math.floor(diff / 1000 / 60) + ' m'
  }
}

export type TypeFormatDate =
  | 'yyyy-MM-dd'
  | 'do MMM yyyy'
  | 'yyyy - MM - dd'
  | 'do MMM'
  | 'LLL dd, yyyy'
  | 'dd LLLL, yyyy'
  | 'dd LLLL, yyyy - HH:mm'
  | 'dd MMMM yyyy'
  | 'dd MMM'
  | 'MMM dd, yyyy'
  | 'dd LLL yyyy'
  | 'dd MMMM'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'HH:mm:ss'
  | 'dd MMMM yyyy'
  | 'HH:mm'
