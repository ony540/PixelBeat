import { useEffect, useRef, useState } from 'react'
import { SearchIcon, StandardPixelBorder } from '@/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { RecentSearchList } from '.'

export const SearchBar = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const q = queryParams.get('q')
  const [input, setInput] = useState<string>(q ? q : '')
  const [toggleInput, setToggleInput] = useState<boolean>(true)
  const [recentSearchToggle, setRecentSearchToggle] = useState<boolean>(
    search ? false : true
  )

  const handleRecentSearchToggle = () => {
    setRecentSearchToggle(!recentSearchToggle)
  }

  const handleInputToggle = () => {
    setToggleInput(!toggleInput)
    setRecentSearchToggle(!recentSearchToggle)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (toggleInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [toggleInput])

  const onChangeInput = e => {
    setInput(e.target.value)
  }

  const handleNavigateToResults = (query: string) => {
    navigate({
      pathname: '/search',
      search: `?q=${query}`
    })
  }

  const storeRecentSearchInput = (input: string) => {
    const storedRecentSearchItem = localStorage.getItem('recent') as string
    const parseString =
      JSON.parse(storedRecentSearchItem).filter(item => item !== input) || []
    const updatedSearchList = [input, ...parseString].slice(0, 6)
    localStorage.setItem('recent', JSON.stringify([...updatedSearchList]))
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!input) return
      handleNavigateToResults(input)
      storeRecentSearchInput(input)
      setRecentSearchToggle(false)
    }
  }

  return (
    <div className="relative py-20">
      <StandardPixelBorder
        propsClass="absolute w-full h-50 cureor-pointer"
        isHeight={'100%'}
      />

      <SearchIcon
        isAbsolute={true}
        onClick={handleInputToggle}
      />
      {toggleInput && (
        <input
          value={input}
          onClick={handleRecentSearchToggle}
          onKeyDown={handleSearch}
          onChange={onChangeInput}
          ref={inputRef}
          placeholder="어떤 것을 듣고 싶으세요?"
          type="text"
          className="absolute w-[70%] mobile:top-30 mobile:left-20 h-30 outline-none bg-mainBlack text-mainWhite"
        />
      )}

      {recentSearchToggle && (
        <RecentSearchList
          onClickRecentSearchToggle={handleRecentSearchToggle}
          storeRecentSearchInput={storeRecentSearchInput}
          setInput={setInput}
        />
      )}
    </div>
  )
}
