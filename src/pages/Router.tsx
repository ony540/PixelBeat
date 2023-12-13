import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import { ErrorComponent, MyProfileLike } from '@/components'
import { ReactNode } from 'react'
import {
  Layout,
  Recommend,
  Bill,
  Home,
  LoginEmail,
  SignUpEmail,
  ProfileEdit,
  MyMusicMain,
  MyMusicBill,
  MyMusicBillId,
  Search,
  Artist,
  Album,
  RecommendEntry,
  Entry,
  Profile
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
      generateRoute('/recommend', <RecommendEntry />),
      generateRoute('/recommend/:id', <Recommend />),
      generateRoute('/entry', <Entry />),
      generateRoute('/signup/email', <SignUpEmail />),
      generateRoute('/profile/edit', <ProfileEdit />),
      generateRoute('/login/email', <LoginEmail />),
      generateRoute('/home', <Home />),
      generateRoute('/search', <Search />),
      generateRoute('/mymusic/main', <MyMusicMain />),
      generateRoute('/mymusic/bill/:billid', <MyMusicBillId />),
      generateRoute('/mymusic/bill', <MyMusicBill />),
      generateRoute('/artist/:id', <Artist />),
      generateRoute('/album/:id', <Album />),
      generateRoute('/bill/:id', <Bill />),
      generateRoute('/profile/:id/profile', <Profile />),
      generateRoute('/profile/:id/profilelike', <MyProfileLike />),
    ]
  }
]

export const router = createBrowserRouter(routes)
