import { MenuIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'

export const RelatedArtist = ({ artist_relatedArtistracks }) => {
  const navigate = useNavigate()

  return (
    <div className="mobile:px-20 desktop:px-60 mt-27 relative mb-80">
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 mobile:left-60 desktop:top-5 desktop:left-130">
        관련 가수
      </h1>

      <div className="relative desktop:px-3 mobile:px-1">
        <div className="overflow-x-auto">
          <div className="flex">
            {artist_relatedArtistracks &&
              artist_relatedArtistracks.artists.map(item => (
                <div
                  className="mt-6 mr-8 flex flex-col items-center mobile:w-150 mobile:h-176"
                  key={item.id}>
                  <div className="mobile:w-150 mobile:h-156 border-[1.4px] border-b-0 overflow-y-hidden">
                    <img
                      loading="lazy"
                      className="mobile:w-150 mobile:h-156"
                      src={item.images[1].url || defaultAlbumImg}
                      alt={`${item.name}.img`}
                    />
                  </div>
                  <div
                    className="bg-mainGray whitespace-nowrap w-full  text-center text-mainBlack cursor-pointer hover:underline"
                    onClick={() => navigate(`/artist/${item.id}`)}>
                    {item.name.length >= 10
                      ? item.name.slice(0, 7) + '...'
                      : item.name}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
