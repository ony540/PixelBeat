import { MenuIcon } from '@/assets'
import { ArtistItem } from '../common/item/ArtistItem'
import { useSwipe } from '@/hooks'

export const RelatedArtist = ({ artist_relatedArtistracks, propsClass }) => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  return (
    <div className={`px-20 desktop:px-60 mt-27 relative  ${propsClass}`}>
      <MenuIcon />
      <h1 className="absolute text-mainBlack top-4 left-60 desktop:top-5 desktop:left-130">
        관련 가수
      </h1>

      <div className="relative desktop:px-3 px-1">
        <ul
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className="overflow-x-auto flex">
          {artist_relatedArtistracks &&
            artist_relatedArtistracks.artists.map(item => (
              <ArtistItem
                data={item}
                key={item.id}
                isDrag={isDrag}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}
