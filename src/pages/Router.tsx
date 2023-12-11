import { Navigate, createBrowserRouter } from "react-router-dom";
import { EmailLogin } from './EmailLogin';
import { RouteObject } from 'react-router-dom'
import { ErrorComponent } from '@/components'
import { ReactNode } from 'react'
import { Layout, Entry, Recommend, Bill, Home, Login, SignUp, MakeProfile, MyMusic, MyMusicRepo, Search } from '@/pages'

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
      generateRoute("/login",<Login />),
      generateRoute("/signup", <SignUp />),
      generateRoute("/makeprofile", <MakeProfile />),
      generateRoute("/emaillogin", <EmailLogin />),
      generateRoute('/home', <Home />),
      generateRoute('/recommend', <Recommend />),
      generateRoute('/recommend/:id', <Recommend />),
      generateRoute('/search', <Search />),
      generateRoute('/bill/:id', <Bill />),
      generateRoute('/mymusic', <MyMusic />),
      generateRoute('/mymusicrepo', <MyMusicRepo />),
    ]
  }
]

export const router = createBrowserRouter(routes)
