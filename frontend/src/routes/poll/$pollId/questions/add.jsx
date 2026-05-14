import { createFileRoute } from '@tanstack/react-router'
import AddQuestion from '../../../../components/poll/AddQuestion.jsx'
export const Route = createFileRoute('/poll/$pollId/questions/add')({
  component: RouteComponent,
})

function RouteComponent() {
    const {pollId} = Route.useParams()
    console.log("FORM ROUTEING ",pollId)
  return <AddQuestion pollId={pollId}/>
}
