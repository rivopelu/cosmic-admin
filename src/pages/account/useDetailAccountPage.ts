import { ROUTES } from '@/constants/routes'
import { AccountRepository } from '@/repositories/account.repository'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'sonner'
import * as Yup from 'yup'

export function useDetailAccountPage() {
  const { id } = useParams({ from: ROUTES.ACCOUNT_DETAIL('$id') })
  const accountRepository = new AccountRepository()

  const [showModal, setShowModal] = useState<'APPROVE' | 'REJECT' | undefined>(
    undefined,
  )

  const queryDetailAccount = useQuery({
    queryKey: ['detail-account', id],
    queryFn: () => accountRepository.getDetailAccount(id),
  })

  const mutationReject = useMutation({
    mutationFn: (data: { reason: string }) =>
      accountRepository.rejectAccount(id, data).then(() => {
        onCloseModal()
        toast.success('Reject account success')
        queryDetailAccount.refetch()
      }),
  })

  const mutationApprove = useMutation({
    mutationFn: () =>
      accountRepository.approveAccount(id).then(() => {
        onCloseModal()
        toast.success('Approve account success')
        queryDetailAccount.refetch()
      }),
  })

  const formikReason = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: Yup.object().shape({
      reason: Yup.string().required('Reason is required'),
    }),
    onSubmit: (values) => {
      mutationReject.mutate(values)
    },
  })

  function onCloseModal() {
    formikReason.resetForm({
      values: { reason: '' }, // Paksa nilai jadi kosong
      errors: {}, // Paksa error jadi kosong
      touched: {}, // Paksa status touched jadi kosong
    })
    setShowModal(undefined)
  }

  return {
    queryDetailAccount,
    showModal,
    setShowModal,
    onCloseModal,
    formikReason,
    mutationReject,
    mutationApprove,
  }
}
