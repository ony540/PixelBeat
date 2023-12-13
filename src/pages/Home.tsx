import { Header, NavBar, PlayBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'

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
