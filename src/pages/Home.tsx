import {
  Banner,
  Header,
  NavBar,
  SimilarUserList,
  TopTrackList
} from '@/components/home'

export const Home = () => {
  return (
    <div className="relative h-screen overflow-y-auto">
      <Header />
      <Banner />
      <SimilarUserList />
      <TopTrackList />
      <NavBar />
    </div>
  )
}
