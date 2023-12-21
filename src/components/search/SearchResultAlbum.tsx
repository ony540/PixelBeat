import { MenuIcon } from '@/assets'
import { AlbumItem } from '@/components'
import { useSwipe } from '@/hooks'

export const SearchResultAlbum = ({ albums }) => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  if (!albums || albums.items.length === 0) {
    return (
      <div className="relative mt-22">
        <MenuIcon />
        <h2
          className="absolute text-mainBlack left-40 
                    top-4 
                    desktop:top-5 desktop:left-80">
          앨범
        </h2>
        <p>No Item</p>
      </div>
    )
  }

  return (
    <>
      <MenuIcon />
      <h2
        className="absolute text-mainBlack left-40 
                    top-4 
                    desktop:top-5 desktop:left-80">
        앨범
      </h2>
      <ul
        className="flex overflow-x-auto relative gap-8 desktop:gap-16 overflow-y-hidden mt-8"
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}>
        {albums &&
          albums.items.map(item => (
            <AlbumItem
              data={item}
              key={item.id}
              isDrag={isDrag}
            />
          ))}
      </ul>
    </>
  )
}
