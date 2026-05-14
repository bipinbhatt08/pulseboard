import { createFileRoute, useSearch } from '@tanstack/react-router'
import AddOption from '../../../../components/poll/AddOption'

export const Route = createFileRoute('/question/$questionId/options/add')({
  component: RouteComponent,
})

function RouteComponent() {
    const { questionId } = Route.useParams()
    const {pollId} = Route.useSearch()
    return <AddOption questionId={questionId} pollId={pollId} />
  
}
