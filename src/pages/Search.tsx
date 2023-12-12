import { NavBar } from '@/components'
import { SearchBar, SearchResultWrap } from '@/components/search'

export const Search = () => {
  return (
    <>
      <div className="relative h-screen overflow-y-auto mobile:px-20 desktop:px-60">
        <SearchBar />
        <SearchResultWrap />
      </div>

      <NavBar />
    </>
  )
}
