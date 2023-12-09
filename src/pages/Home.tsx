import {
  Banner,
  Header,
  NavBar,
  SimilarUser,
  TopTrackList
} from '@/components/home'

export const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <SimilarUser />
      <TopTrackList />
      <NavBar />
    </div>
  )
}
