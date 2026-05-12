import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/poll/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/poll/"!</div>
}
