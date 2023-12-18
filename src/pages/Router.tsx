import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import { ErrorComponent, MyProfileLike } from '@/components'
import { ReactNode } from 'react'
import {
  Layout,
  Recommend,
  Bill,
  Home,
  SigninWithEmail,
  SignupWithEmail,
  ProfileEdit,
  MyMusicBillId,
  Search,
  Artist,
  Album,
  RecommendEntry,
  Entry,
  SignupGreeting,
  BillFromSpotify,
  Profile,
  BillHasOwner,
  MyMusic
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
      generateRoute('/mymusic/:id', <MyMusic />),
      generateRoute('/mymusic/bill/:billid', <MyMusicBillId />),
      generateRoute('/artist/:id', <Artist />),
      generateRoute('/album/:id', <Album />),
      generateRoute('/profile', <Profile />),
      generateRoute('/profile/:id', <MyProfileLike />),
      generateRoute('/bill/:id', <Bill />),
      generateRoute('/bill/playlist/:id', <BillFromSpotify />),
      generateRoute('/bill/:id/:userid', <BillHasOwner />)
    ]
  }
]

export const router = createBrowserRouter(routes)
