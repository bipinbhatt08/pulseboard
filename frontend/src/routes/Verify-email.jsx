import { createFileRoute } from '@tanstack/react-router'
import VerifyEmail from '../components/auth/VerifyEmail'

export const Route = createFileRoute('/Verify-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VerifyEmail/>
}
