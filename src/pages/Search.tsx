import { NavBar } from '@/components/home'
import { SearchBar, SearchResultWrap } from '@/components/search'

export const Search = () => {
  return (
    <>
      <div className="relative h-screen overflow-y-auto px-20">
        <SearchBar />
        <SearchResultWrap />
      </div>

      <NavBar />
    </>
  )
}
