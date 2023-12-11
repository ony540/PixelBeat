import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import { ErrorComponent } from '@/components'
import { Layout, Entry, Recommend, Bill, Home, Search } from '@/pages'
import { ReactNode } from 'react'

const generateRoute = (
  path: string,
  component: ReactNode,
  children?: RouteObject[]
): RouteObject => {
  return {
    path: path,
    element: component,
    errorElement: <ErrorComponent />,
    children: children
  }
}

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorComponent />,
    children: [
      generateRoute('/', <Entry />),
      generateRoute('/home', <Home />),
      generateRoute('/recommend', <Recommend />),
      generateRoute('/recommend/:id', <Recommend />),
      generateRoute('/bill', <Bill />),
      generateRoute('/search', <Search />),
    ]
  }
]

export const router = createBrowserRouter(routes)
