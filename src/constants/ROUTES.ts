import { LazyRouteType } from '@/types'

export const ROUTES = [
  'RecommendEntry',
  'Entry',
  'Recommend',
  'ProfileEdit',
  'BillFromSpotify',
  'BillHasOwner',
  'SigninWithEmail',
  'SignupWithEmail',
  'SignupGreeting',
  'Greeting',
  'Profile',
  'Home',
  'Search',
  'MyMusic',
  'Album',
  'Artist',
  'Bill'
]

export const routeConfig: {
  [key: string]: LazyRouteType
} = {
  RecommendEntry: { index: true, path: '/', authentication: false },
  Search: { index: false, path: '/Search', authentication: true },
  Recommend: { index: false, path: 'recommend/:id', authentication: false },
  MyMusic: { index: false, path: 'MyMusic/:id', authentication: true },
  Profile: { index: false, path: 'profile/:id', authentication: true },
  Bill: { index: false, path: 'Bill/:id', authentication: false },
  BillHasOwner: {
    index: false,
    path: 'Bill/:id/:userid',
    authentication: false
  },
  BillFromSpotify: {
    index: false,
    path: 'bill/playlist/:id',
    authentication: false
  },
  Album: { index: false, path: 'Album/:id', authentication: false },
  Artist: { index: false, path: 'Artist/:id', authentication: false }
}
