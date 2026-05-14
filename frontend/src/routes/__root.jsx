import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NotFound from '../components/NotFound'
import Navbar from '../components/Navbar'
import { tokenStore } from '../services/tokenStore'


const RootLayout = () => {
  const user = tokenStore.getUser()

  return (
    <>
      <Navbar user={user} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout,notFoundComponent: () => <NotFound /> })