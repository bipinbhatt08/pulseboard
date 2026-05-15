import { createFileRoute } from '@tanstack/react-router'
import PollVote from '../../../components/poll/PollVote.jsx'
import Navbar from '../../../components/Navbar.jsx'
export const Route = createFileRoute('/poll/$pollId/')({
  component: () => {
        const { pollId } = Route.useParams()

    return (<>
        <Navbar/>
        <PollVote pollId={pollId}/>
    </>)
  }
})