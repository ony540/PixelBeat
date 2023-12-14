import { Header, NavBar, PlayBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand'

export const Home = () => {
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  return (
    <div className="relative h-screen overflow-y-auto">
      <Header />
      <Banner />
      <SimilarUserList />
      <TopTrackList />
      <NavBar />
      <Portal>
        {currentTrack && (
          <PlayBar propsClass="bottom-66 border-b border-mainGray" />
        )}
      </Portal>
    </div>
  )
}
