import { useParams } from '@tanstack/react-router'

export default function DetailAccountPage() {
  const { id } = useParams({ from: '/account/$id' })
  return <div>Detail Account: {id}</div>
}
