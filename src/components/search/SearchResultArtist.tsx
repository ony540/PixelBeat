import { MenuIcon } from '@/assets'
import { ArtistItem } from '@/components'
import { useSwipe } from '@/hooks'

export const SearchResultArtist = ({ artists }) => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  if (!artists || artists.items.length === 0) {
    return (
      <div className="relative mt-22">
        <MenuIcon />
        <h2
          className="absolute text-mainBlack left-40 
                    top-4 
                    desktop:top-5 desktop:left-80">
          가수
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
        가수
      </h2>
      <ul
        className="relative desktop:px-3 px-1 overflow-x-auto flex"
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}>
        {artists &&
          artists.items.map(item => (
            <ArtistItem
              data={item}
              key={item.id}
              isDrag={isDrag}
            />
          ))}
      </ul>
    </>
  )
}
