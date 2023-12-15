import { PixelBorder } from '@/assets'
import { GENRE_CATEGORY } from '@/constants'
import { FAVORITE_GENRE_ICON_MAPPING } from '@/constants/recommned'

interface GenreItemProps {
  item: string
  onClick: (item: string) => void
  isSelected: boolean
}

export const RecommendGenreItem = ({ item, onClick, isSelected }: GenreItemProps) => (
  <div
    onClick={() => onClick(GENRE_CATEGORY[item])}
    className={`cursor-pointer ${isSelected ? 'selected-item' : ''}`}>
    <div className="relative">
      <div className="absolute genre-icon-position">
        {FAVORITE_GENRE_ICON_MAPPING[item]}
      </div>
      <PixelBorder />
      <div className="absolute genre-text-size">{item}</div>
    </div>
  </div>
)
