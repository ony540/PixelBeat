import { FAVORITE_GENRE_TEXT } from '@/constants/recommned'
import { useRecommendStore } from '@/zustand'
import { RecommendGenreItem } from '@/components/recommend'
import { GENRE_CATEGORY } from '@/constants'

export const GenreSelector = () => {
  const genreSelect = useRecommendStore(state => state.selectGenre)
  const initialStore = useRecommendStore(state => state.initialStore)
  const genreStore = initialStore.genre

  return (
    <>
      <h1 className="text-22 desktop:text-40 mt-42 grid place-items-center">
        좋아하는 음악 장르
      </h1>
      <h2 className="text-14 desktop:text-20 grid place-items-center mb-20">
        (최대 5개)
      </h2>
      <div className="genre-selector-container">
        {FAVORITE_GENRE_TEXT.map((item, idx) => (
          <RecommendGenreItem
            key={item + idx}
            item={item}
            onClick={genreSelect}
            isSelected={genreStore.includes(GENRE_CATEGORY[item])}
          />
        ))}
      </div>
    </>
  )
}
