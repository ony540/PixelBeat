import { Spinner } from '@/assets'
import { Header, NavBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'
import { useUserInfo } from '@/hooks'

const Home = () => {
  const { isLoading } = useUserInfo()

  if (isLoading) return <Spinner text={'메인 페이지 불러오는 중...'} />

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
