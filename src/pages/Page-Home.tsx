import { Header, NavBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'
import { useUserInfo } from '@/hooks'

const Home = () => {
  const { isLoading } = useUserInfo()

  if (isLoading) return <>loading</>
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
