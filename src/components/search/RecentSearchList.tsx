import { Xbutton } from '@/assets'
import { useEffect, useState } from 'react'

export const RecentSearchList = () => {
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

  const handleDeleteSearchQuery = (index: number) => {
    const updatedQueries = [...decodedRecentSearchList]
    updatedQueries.splice(index, 1)
    localStorage.setItem('recent', JSON.stringify(updatedQueries))
    setDecodedRecentSearchList(updatedQueries)
  }

  return (
    <div className="absolute mobile:top-70 desktop:top-100 z-30 p-4 rounded mobile:w-[350px] desktop:w-[680px] bg-mainBlack">
      <div className="text-white mb-5 pt-4 px-8">최근 검색 기록</div>

      {decodedRecentSearchList.length > 0 ? (
        <ul className="list-none p-0 m-0">
          {decodedRecentSearchList.map((item, idx) => (
            <li
              key={idx}
              className="mb-1 z-30 py-4 px-8 cursor-pointer hover:search-item-hover">
              <Xbutton
                propsClass={
                  'absolute mobile:right-20 mobile:mt-3 mobile:w-18 mobile:h-18 desktop:w-30 desktop:h-30 hover:search-item-hover'
                }
                deleteItem={() => handleDeleteSearchQuery(idx)}
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
