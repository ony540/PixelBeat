import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouteObject } from 'react-router-dom'
import { ErrorComponent } from '@/components'

import {
  Layout,
  Entry,
  Recommend,
  Bill,
  Home,
  Search,
  Artist,
  Album
} from '@/pages'

import { ReactNode } from 'react'
import { Layout, Entry, Recommend, Bill, Home, Login, LoginEmail, SignUpEmail, ProfileEdit, MyMusicMain, MyMusicBill, MyMusicBillId, Search } from '@/pages'

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
      generateRoute("/", <Entry />),
      generateRoute("/recommend", <Recommend />),
      generateRoute("/recommend/:id", <Recommend />),
      generateRoute("/login", <Login />),
      generateRoute("/signup/email", <SignUpEmail />),
      generateRoute("/profile/edit", <ProfileEdit />),
      generateRoute("/login/email", <LoginEmail />),
      generateRoute('/home', <Home />),
      generateRoute('/recommend', <Recommend />),
      generateRoute('/recommend/:id', <Recommend />),
      generateRoute('/search', <Search />),
      generateRoute('/mymusic/main', <MyMusicMain />),
      generateRoute('/mymusic/bill/:billid', <MyMusicBillId />),
      generateRoute('/mymusic/bill', <MyMusicBill />),
      generateRoute('/artist/:id', <Artist />),
      generateRoute('/album/:id', <Album />),
      generateRoute('/bill/:id', <Bill />)
    ]
  }
]

export const router = createBrowserRouter(routes)
