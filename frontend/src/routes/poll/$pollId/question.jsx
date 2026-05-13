import { createFileRoute, useParams } from '@tanstack/react-router'
import AddQuestion from '../../../components/poll/AddQuestion'
export const Route = createFileRoute('/poll/$pollId/question')({
  component: RouteComponent
})

function RouteComponent() {
    const {pollId} = Route.useParams()
    console.log("FORM ROUTEING ",pollId)
  return <AddQuestion pollId={pollId}/>
}
