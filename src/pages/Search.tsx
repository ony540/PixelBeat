import { NavBar, PlayBar } from '@/components'
import { SearchBar, SearchResultWrap } from '@/components/search'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand'

export const Search = () => {
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  return (
    <>
      <div className="relative h-screen overflow-y-auto mobile:px-20 desktop:px-60">
        <SearchBar />
        <SearchResultWrap />
      </div>

      <NavBar />
      <Portal>
        {currentTrack && (
          <PlayBar propsClass="bottom-66 border-b border-mainGray" />
        )}
      </Portal>
    </>
  )
}
