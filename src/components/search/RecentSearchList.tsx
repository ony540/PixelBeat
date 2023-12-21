import { Xbutton } from '@/assets'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface RecentSearchListProps {
  onClickRecentSearchToggle: () => void
  setInput: (query: string) => void
  storeRecentSearchInput: (input: string) => void
}

export const RecentSearchList = ({
  onClickRecentSearchToggle,
  setInput,
  storeRecentSearchInput
}: RecentSearchListProps) => {
  const navigate = useNavigate()
  const [decodedRecentSearchList, setDecodedRecentSearchList] = useState<
    string[]
  >([])

  useEffect(() => {
    const storedRecentSearchList = localStorage.getItem('recent') || '[]'
    const decodedList = JSON.parse(storedRecentSearchList).map(
      (query: string) => decodeURIComponent(query)
    )
    setDecodedRecentSearchList(decodedList)
  }, [])

  const handleNavigateToResults = (query: string) => {
    navigate({
      pathname: '/search',
      search: `?q=${query}`
    })
    setInput(query)
    storeRecentSearchInput(query)
    onClickRecentSearchToggle()
  }

  const handleDeleteSearchQuery = (event, index: number) => {
    event.stopPropagation()

    const updatedQueries = [...decodedRecentSearchList]
    updatedQueries.splice(index, 1)
    localStorage.setItem('recent', JSON.stringify(updatedQueries))
    setDecodedRecentSearchList(updatedQueries)
  }

  return (
    <div className="absolute top-70 z-30 p-4 rounded w-[350px] desktop:w-[600px] bg-mainBlack">
      <div className="text-white mb-5 pt-4 px-8">최근 검색 기록</div>

      {decodedRecentSearchList.length > 0 ? (
        <ul className="list-none p-0 m-0">
          {decodedRecentSearchList.map((item, idx) => (
            <li
              onClick={() => handleNavigateToResults(item)}
              key={idx}
              className="mb-1 z-30 py-4 px-8 cursor-pointer hover:search-item-hover">
              <Xbutton
                propsClass={
                  'absolute right-20 mt-3 w-18 h-18 desktop:w-30 desktop:h-30 hover:search-item-hover'
                }
                deleteItem={event => handleDeleteSearchQuery(event, idx)}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-mainGray py-4 px-8">검색 기록이 없습니다.</div>
      )}
    </div>
  )
}
