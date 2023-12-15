import { useState } from 'react'
import { MenuIcon } from '@/assets'
import { TrackItem } from '..'

export const ArtistTopTrack = ({ artist_topTracks }) => {
  const [visibleTracks, setVisibleTracks] = useState(5)
  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 5)
  }

  return (
    <div className="mobile:px-20 desktop:px-60 mt-27 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 mobile:left-60 desktop:top-5 desktop:left-130">
        인기 트랙
      </h1>
      <div className="relative desktop:pl-3 mobile:px-1 mt-6">
        <ul className="border-b-1">
          {artist_topTracks &&
            artist_topTracks.slice(0, visibleTracks).map(item => (
              <TrackItem
                data={item}
                key={item.id}
              />
            ))}
        </ul>
        {visibleTracks < artist_topTracks.length && (
          <button
            className="border-1 border-t-0 w-full hover:underline"
            onClick={loadMore}>
            더보기
          </button>
        )}
      </div>
    </div>
  )
}

export default ArtistTopTrack
