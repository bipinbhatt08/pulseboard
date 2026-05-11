import { createFileRoute } from '@tanstack/react-router'
import VerifyEmail from '../components/VerifyEmail'

export const Route = createFileRoute('/Verify-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VerifyEmail/>
}
