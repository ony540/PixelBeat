import { NavBar } from '@/components'
import { SearchBar, SearchResultWrap } from '@/components/search'

const Search = () => {

  return (
    <>
      <div className={`relative h-screen overflow-y-auto px-20 desktop:px-60`}>
        <SearchBar />
        <SearchResultWrap />
      </div>
      <NavBar />
    </>
  )
}

export default Search
