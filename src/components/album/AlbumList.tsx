import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const AlbumList = ({ album_list }) => {
  const navigate = useNavigate()
  const [visibleTracks, setVisibleTracks] = useState(5)

  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 5)
  }

  if (!album_list) {
    return null
  }

  return (
    <div className="mobile:px-20 desktop:px-60 mb-100 mt-20">
      <div className="relative desktop:px-3 mobile:px-1">
        {album_list &&
          album_list.tracks.items.slice(0, visibleTracks).map(item => (
            <div
              className="relative desktop:my-6"
              key={item.id}>
              <div className="border-1 my-4 flex items-center gap-10">
                <img
                  className="mobile:w-50 mobile:h-51 mr-4 desktop:w-65 desktop:h-66"
                  src={album_list.images[1].url}
                  alt={`${item.name}.img`}
                />
                <div className="flex flex-col overflow-hidden">
                  <span
                    className={
                      item.name.length > 30 ? 'text-flow-on-hover' : ''
                    }>
                    {item.name}
                  </span>
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate(`/artist/${item.artists[0].id}`)}>
                    {item.artists[0].name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      {visibleTracks < album_list.tracks.items.length && (
        <button
          className="border-1 w-full hover:underline"
          onClick={loadMore}>
          더보기
        </button>
      )}
    </div>
  )
}
