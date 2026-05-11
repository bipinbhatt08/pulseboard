import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

import App from '../App'

function Index() {
  return (
    <App/>
  )
}