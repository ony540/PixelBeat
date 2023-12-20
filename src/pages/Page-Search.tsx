import { NavBar } from '@/components'
import { SearchBar, SearchResultWrap } from '@/components/search'
import { useNowPlayStore } from '@/zustand'

const Search = () => {
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  return (
    <>
      <div
        className={`relative h-screen overflow-y-auto mobile:px-20 desktop:px-60 ${
          currentTrack && 'mb-70'
        } `}>
        <SearchBar />
        <SearchResultWrap />
      </div>
      <NavBar />
    </>
  )
}

export default Search
