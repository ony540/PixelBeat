import { LazyRouteType } from '@/types'

export const ROUTES = [
  'RecommendEntry',
  'Entry',
  'Recommend',
  'ProfileEdit',
  'BillFromSpotify',
  'SigninWithEmail',
  'SignupWithEmail',
  'SignupGreeting',
  'Greeting',
  'Profile',
  'Home',
  'Search',
  'Mymusic',
  'Mymusic/main',
  'Mymusic/bill/:billid',
  'Mymusic/bill',
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
  Bill: { index: false, path: 'Bill/:id' },
  BillFromSpotify: { index: false, path: 'bill/playlist/:id' },
  Profile: { index: false, path: 'Profile/:id' },
  Album: { index: false, path: 'Album/:id' },
  Artist: { index: false, path: 'Artist/:id' }
}
