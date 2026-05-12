import { createFileRoute } from '@tanstack/react-router'
import CreatePoll from '../../components/poll/CreatePoll.jsx'

export const Route = createFileRoute('/poll/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
        <CreatePoll/>
  </div>
}
