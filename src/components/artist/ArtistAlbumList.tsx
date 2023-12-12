import { RectangleVertax } from '@/assets'
import { useNavigate } from 'react-router-dom'

const ArtistAlbumList = ({ artist_albums }) => {
  const navigate = useNavigate()
  return (
    <div className="mobile:px-20 desktop:px-60 mt-27">
      <div className="flex overflow-x-auto relative mobile:gap-8 desktop:gap-16 overflow-y-hidden">
        {artist_albums?.albumList &&
          artist_albums?.albumList.map(album => (
            <div
              onClick={() => navigate(`/album/${album.id}`)}
              key={album.id}
              className="flex-col mobile:w-150 mobile:h-176 flex-shrink-0 bg-mainGray cursor-pointer">
              <RectangleVertax />
              {album.images && album.images.length > 0 ? (
                <img
                  loading="lazy"
                  className={`w-150 h-150 cursor-pointer`}
                  src={album.images[1].url}
                  alt={`${album.name}.img`}
                />
              ) : (
                <div className="mobile:w-150 mobile:h-156 grid place-items-center">
                  No Image
                </div>
              )}
              <p className="w-150 h-26 text-center text-mainBlack desktop:text-16">
                {album.name.length >= 15
                  ? album.name.slice(0, 15) + '...'
                  : album.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ArtistAlbumList
