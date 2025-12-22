import InputText from '@/components/InputText'
import { Card, CardContent } from '@/components/ui/card'
import { useSignInPage } from './useSignInPage'
import { FormikProvider } from 'formik'
import { Button } from '@/components/ui/button'
import Spacer from '@/components/Spacer'

export default function SignInPage() {
  const page = useSignInPage()
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="w-full bg-slate-400 h-full">LEFT</div>
      <div className="w-full h-full flex items-center justify-center">
        <Card>
          <FormikProvider value={page.formik}>
            <CardContent>
              <div className="grid gap-2 min-w-sm">
                <div className="text-2xl font-bold">COSMIC</div>
                <Spacer size="md" />
                <InputText
                  label="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                <InputText
                  label="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Spacer size="md" />
                <Button
                  loading={page.mutateSignIn.isPending}
                  onClick={() => page.formik.handleSubmit()}
                  type="submit"
                >
                  SIGN IN
                </Button>
              </div>
            </CardContent>
          </FormikProvider>
        </Card>
      </div>
    </main>
  )
}
