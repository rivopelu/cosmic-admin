import { useFormik } from 'formik'
import * as Yup from 'yup'
export function useSignInPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      console.log(values)
    },
  })
  return { formik }
}
