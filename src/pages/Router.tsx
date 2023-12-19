import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import { routeConfig, ROUTES } from '@/constants'
import Wrapper from './Wrapper'
import { loadTokenAndCheckExpiration } from '@/utils'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { ErrorComponent } from '@/components'

const LazyRoutes = ROUTES.map(route => {
  const { index, path, authentication } = routeConfig[route] || {
    index: false,
    path: route.toLowerCase(),
    authentication: false
  }

  const LazyComponent = React.lazy(() => import(`./Page-${route}.tsx`))

  const RouteComponent = authentication ? PrivateRoute : PublicRoute

  return (
    <Route
      key={route}
      index={index}
      path={path}
      element={
        <RouteComponent
          authentication={authentication}
          LazyComponent={LazyComponent}
        />
      }
    />
  )
})

export const router: any = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Wrapper />}
      errorElement={<ErrorComponent />}
      loader={() => loadTokenAndCheckExpiration()}
      >
      {LazyRoutes}
    </Route>
  )
)
