import { MenuIcon } from '@/assets'
import { useState } from 'react'
import { PlaylistItem } from '..'

export const SearchResultPlaylist = ({ playlists }) => {
  const [visibleTracks, setVisibleTracks] = useState(3)

  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 3)
  }

  if (!playlists || playlists.items.length === 0) {
    return (
      <div className="relative mt-22">
        <MenuIcon />
        <h2 className="absolute text-mainBlack top-3 mobile:left-50 desktop:top-15 desktop:left-100">
          가수
        </h2>
        <p>No Item</p>
      </div>
    )
  }

  return (
    <>
      <MenuIcon />
      <h2 className="absolute text-mainBlack mobile:top-4 left-40 desktop:top-5 desktop:left-80">
        음악영수증
      </h2>
      <div className="desktop:px-3 mobile:px-1 mt-4">
        <ul className="border-b-1">
          {playlists &&
            playlists.items.slice(0, visibleTracks).map(item => (
              <PlaylistItem
                data={item}
                key={item.id}
              />
            ))}
          {visibleTracks < playlists.items.length && (
            <button
              className="border-1 border-b-0 w-full hover:underline"
              onClick={loadMore}>
              더보기
            </button>
          )}
        </ul>
      </div>
    </>
  )
}
