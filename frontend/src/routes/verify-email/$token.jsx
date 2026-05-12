import { createFileRoute } from '@tanstack/react-router'
import VerifyEmail from '../../components/auth/VerifyEmail'

export const Route = createFileRoute('/verify-email/$token')({
  component: RouteComponent,
})

function RouteComponent() {
  const { token } = Route.useParams()
  return <VerifyEmail token={token}/>
}
