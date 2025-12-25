import { toast } from 'sonner'
import { AuthService } from './auth.service'

export default class ErrorService {
  private handleSnackbar(message: string) {
    toast.error(message)
  }

  public fetchApiError(error: any) {
    if (error) {
      const status = error.status || error?.response?.status
      if (status === 401 || status === 403) {
        AuthService.logout()
        return
      }

      if (error?.response?.data?.message) {
        const message = error?.response?.data?.message
        this.handleSnackbar(message)
      } else if (
        error?.code === 'ERR_NETWORK' ||
        error?.message === 'Network Error'
      ) {
        // ...
        this.handleSnackbar(
          'Tidak dapat terhubung ke server. Periksa server backend dan koneksi jaringan Anda.',
        )
      } else if (error?.request) {
        this.handleSnackbar(
          'Tidak ada respon dari server. Periksa koneksi jaringan.',
        )
      } else {
        this.handleSnackbar('Kesalahan dalam mengirim permintaan.')
      }
    } else {
      this.handleSnackbar('Terjadi Kesalahan Pada Sistem')
    }
    throw new Error(error)
  }
}
