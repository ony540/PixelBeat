import { StandardVertex } from '..'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'

export const ArtistImage = ({ artist_info }) => {
  const imageSizeClass = 'mobile:w-198 mobile:h-198 desktop:w-300 desktop:h-300'

  return (
    <div className="mobile:px-20 desktop:px-60">
      {artist_info &&
        artist_info.map(artist => (
          <div key={artist.id}>
            <div className="flex justify-center relative">
              <StandardVertex
                propsClass={`absolute text-black ${imageSizeClass}`}
              />

              <img
                loading="lazy"
                className={`${imageSizeClass}`}
                src={artist.images[1].url || defaultAlbumImg}
                alt={`${artist.name}.img`}
              />
            </div>
            <div className="relative w-full desktop:h-120 mobile:h-90 overflow-hidden">
              <h1
                className={` absolute
                             mobile:text-40 mobile:top-10
                             desktop:top-10 desktop:left-0 desktop:text-60
                            ${
                              artist.name.length >= 20
                                ? 'text-flow-on-hover'
                                : ''
                            }`}>
                {artist.name}
              </h1>

              <h2 className="absolute mobile:text-14 mobile:top-70 desktop:left-0 desktop:text-24 desktop:top-90">
                팔로워: {artist.followers.total}명
              </h2>
            </div>
          </div>
        ))}
    </div>
  )
}
