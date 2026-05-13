import { createFileRoute, useParams } from '@tanstack/react-router'
import AddQuestion from '../../../components/poll/AddQuestion'
export const Route = createFileRoute('/poll/$pollId/question')({
  component: AddQuestion
})

function RouteComponent() {
    const {pollId} = Route.useParams()
  return <AddQuestion pollId={pollId}/>
}
