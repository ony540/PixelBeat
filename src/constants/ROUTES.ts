import { LazyRouteType } from '@/types'

export const ROUTES = [
  'RecommendEntry',
  'Entry',
  'Recommend',
  'ProfileEdit',
  'ProfileUpload',
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
  'MyMusicShelfDetail',
  'Album',
  'Artist',
  'Bill'
]

export const routeConfig: {
  [key: string]: LazyRouteType
} = {
  RecommendEntry: { index: true, path: '/' },
  Recommend: { index: false, path: 'recommend/:id' },
  Search: { index: false, path: '/search' },
  Profile: { index: false, path: 'profile/:id', authentication: true },
  Bill: { index: false, path: 'bill/:id' },
  BillHasOwner: {
    index: false,
    path: 'bill/:id/:userid'
  },
  BillFromSpotify: {
    index: false,
    path: 'bill/playlist/:id'
  },
  MyMusic: { index: false, path: 'mymusic/:id', authentication: true },
  MyMusicShelfDetail: { index: false, path: '/mymusic/shelf/:id' },
  Album: { index: false, path: 'album/:id' },
  Artist: { index: false, path: 'artist/:id' }
}
