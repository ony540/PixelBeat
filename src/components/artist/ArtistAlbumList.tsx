import { useSwipe } from '@/hooks'
import { AlbumItem } from '..'

const ArtistAlbumList = ({ artist_albums }) => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  return (
    <div className="px-20 desktop:px-60 mt-27">
      <ul
       ref={scrollRef}
       onMouseDown={handleDragStart}
       onMouseMove={handleDragMove}
       onMouseUp={handleDragEnd}
       onMouseLeave={handleDragEnd}
        className="flex overflow-x-auto relative gap-8 desktop:gap-16 overflow-y-hidden">
        {artist_albums?.albumList &&
          artist_albums?.albumList.map(album => (
            <AlbumItem
              data={album}
              key={album.id}
              isDrag={isDrag}
            />
          ))}
      </ul>
    </div>
  )
}

export default ArtistAlbumList
