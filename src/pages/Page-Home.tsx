import { Header, NavBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'

const Home = () => {
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
export default Home
