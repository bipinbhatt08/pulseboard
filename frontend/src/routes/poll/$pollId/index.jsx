import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/poll/$pollId/')({
  component: () => {
    const { id } = Route.useParams()
    return <>HELO</>
  }
})