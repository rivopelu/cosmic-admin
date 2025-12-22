import { ENDPOINT } from '@/constants/endpoint'
import ErrorService from '@/services/error.service'
import { HttpService } from '@/services/htpp.service'
import { AuthService } from '@/services/auth.service'
import type { BaseResponse } from '@/types/response/IResModel'
import type { IResSignIn } from '@/types/response/IResSignIn'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from '@tanstack/react-router'

export function useSignInPage() {
  const httpService = new HttpService()
  const errorService = new ErrorService()
  const navigate = useNavigate()

  const mutateSignIn = useMutation({
    mutationFn: (values: any) =>
      httpService
        .POST(ENDPOINT.SIGN_IN(), values)
        .then((res: BaseResponse<IResSignIn>) => {
          const { token, account } = res.data.response_data
          AuthService.login(token, account)
          navigate({ to: '/' })
        })
        .catch((e: any) => {
          errorService.fetchApiError(e)
        }),
  })
  const formik = useFormik({
    initialValues: {
      email: 'rivo@maxxitani.id',
      password: '@Rivopelu123',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      mutateSignIn.mutate(values)
    },
  })
  return { formik, mutateSignIn }
}
