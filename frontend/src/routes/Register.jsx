import { createFileRoute } from '@tanstack/react-router'
import Register from '../components/auth/Register.jsx'

export const Route = createFileRoute('/Register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Register/>
}
