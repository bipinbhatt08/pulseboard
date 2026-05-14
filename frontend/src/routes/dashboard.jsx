import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/Dashboard.jsx'
export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard/>
}