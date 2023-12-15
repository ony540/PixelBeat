import { MenuIcon } from '@/assets'
import { useState } from 'react'
import { TrackItem } from '..'

export const SearchResultTrack = ({ tracks }: { tracks?: any }) => {
  const [visibleTracks, setVisibleTracks] = useState(3)

  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 3)
  }

  if (!tracks || tracks.items.length === 0) {
    return (
      <div className="relative mobile:mt-22 desktop:mt-50">
        <MenuIcon />
        <h2 className="absolute text-mainBlack top-3 mobile:left-50 desktop:top-15 desktop:left-100">
          음악
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
                    mobile:top-4 
                    desktop:top-5 desktop:left-80">
        음악
      </h2>
      <div className="relative desktop:px-3 mobile:px-1 mt-4">
        <ul className="border-b-1">
          {tracks &&
            tracks.items.slice(0, visibleTracks).map(item => (
              <TrackItem
                key={item.id}
                data={item}
              />
            ))}
          {visibleTracks < tracks.items.length && (
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
