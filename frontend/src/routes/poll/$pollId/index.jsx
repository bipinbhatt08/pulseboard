import { createFileRoute } from '@tanstack/react-router'
import PollVote from '../../../components/poll/PollVote.jsx'
export const Route = createFileRoute('/poll/$pollId/')({
  component: () => {
        const { pollId } = Route.useParams()

    return <PollVote pollId={pollId} />
  }
})