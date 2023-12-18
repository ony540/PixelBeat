import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import { routeConfig, ROUTES } from '@/constants'
import Wrapper from './Wrapper'
import Recommend from './Page-Recommend'
import { loadTokenAndCheckExpiration } from '@/utils'

const LazyRoutes = ROUTES.map(route => {
  const { index, path } = routeConfig[route] || {
    index: false,
    path: route.toLowerCase()
  }

  const LazyComponent = React.lazy(() => import(`./Page-${route}.tsx`))

  return (
    <Route
      key={route}
      index={index}
      path={path}
      element={<LazyComponent />}
    />
  )
})

export const router: any = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Wrapper />}
      loader={() => loadTokenAndCheckExpiration()}>
      {LazyRoutes}
      <Route
        path="recommend"
        element={<Recommend />}
      />
    </Route>
  )
)
