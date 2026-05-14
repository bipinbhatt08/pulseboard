import { createFileRoute } from '@tanstack/react-router'
import PollsPage from '../../components/PollsPage.jsx'

export const Route = createFileRoute('/polls/')({
    component: PollsPage
})
