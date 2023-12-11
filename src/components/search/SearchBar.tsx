import { useEffect, useRef, useState } from 'react'
import { StandardPixelBorder } from '..'
import { SearchIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { RecentSearchList } from '.'

export const SearchBar = () => {
  const navigate = useNavigate()
  const [toggleInput, setToggleInput] = useState(false)
  const [input, setInput] = useState('')
  const [recentSearchToggle, setRecentSearchToggle] = useState<boolean>(false)

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
    setInput('')
    setToggleInput(false)
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!input) return
      handleNavigateToResults(input)

      const storedRecentSearchItem = localStorage.getItem('recent') as string
      const parseString = JSON.parse(storedRecentSearchItem) || []
      const updatedSearchList = [...parseString, input].sort((a, b) => b - a)
      localStorage.setItem('recent', JSON.stringify([...updatedSearchList]))
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
          onClick={handleRecentSearchToggle}
          onKeyDown={handleSearch}
          onChange={onChangeInput}
          ref={inputRef}
          type="text"
          className="absolute w-[70%] mobile:top-30 mobile:left-20 h-30 outline-none bg-mainBlack text-mainWhite"
        />
      )}

      {recentSearchToggle && <RecentSearchList />}
    </div>
  )
}
