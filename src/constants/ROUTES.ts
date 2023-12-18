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
  'Profile',
  // 'Profile/:id/profilelike',
  // 'Profile/:id/profile',
  'Bill'
  // 'Bill/:id',
  // 'Bill/playlist/:id'
]

export const routeConfig: { [key: string]: LazyRouteType } = {
  RecommendEntry: { index: true, path: '/' },
  Recommend: { index: false, path: 'recommend/:id' },
  MyMusic: { index: false, path: 'MyMusic/:id' },
  Bill: { index: false, path: 'Bill/:id' },
  BillHasOwner: { index: false, path: 'Bill/:id/:userid' },
  BillFromSpotify: { index: false, path: 'bill/playlist/:id' },
  Profile: { index: false, path: 'Profile/:id' },
  Album: { index: false, path: 'Album/:id' },
  Artist: { index: false, path: 'Artist/:id' }
}
