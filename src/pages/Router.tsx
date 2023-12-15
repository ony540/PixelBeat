import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import { ErrorComponent } from '@/components'
import { ReactNode } from 'react'
import {
  Layout,
  Recommend,
  Bill,
  Home,
  SigninWithEmail,
  SignupWithEmail,
  ProfileEdit,
  MyMusicMain,
  MyMusicBill,
  MyMusicBillId,
  Search,
  Artist,
  Album,
  RecommendEntry,
  Entry,
  SignupGreeting,
  BillFromSpotify
} from '@/pages'

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
      // generateRoute('/', <RecommendEntry />),
      generateRoute('/recommend', <RecommendEntry />),
      generateRoute('/recommend/:id', <Recommend />),
      generateRoute('/entry', <Entry />),
      generateRoute('/signup/email', <SignupWithEmail />),
      generateRoute('/signin/email', <SigninWithEmail />),
      generateRoute('/greeting', <SignupGreeting />),
      generateRoute('/profile/edit', <ProfileEdit />),
      generateRoute('/home', <Home />),
      generateRoute('/search', <Search />),
      generateRoute('/mymusic/main', <MyMusicMain />),
      generateRoute('/mymusic/bill/:billid', <MyMusicBillId />),
      generateRoute('/mymusic/bill', <MyMusicBill />),
      generateRoute('/artist/:id', <Artist />),
      generateRoute('/album/:id', <Album />),
      generateRoute('/bill/:id', <Bill />),
      generateRoute('/bill/playlist/:id', <BillFromSpotify />)
    ]
  }
]

export const router = createBrowserRouter(routes)
