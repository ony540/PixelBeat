import { getAllTracksDuration, msToMinutesAndSeconds } from '@/utils'
import { StandardVertex } from '@/assets'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'
import { useNavigate } from 'react-router-dom'

export const AlbumArtistInfo = ({ album_data }) => {
  const navigate = useNavigate()

  const { id, name, artists, release_date, total_tracks, images, tracks } =
    album_data

  const handleClickAritst = (id: string) => {
    navigate(`/artist/${id}`)
  }

  const allTrackDuration = getAllTracksDuration({ tracks: tracks.items })
  const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration)

  const mobileImageSize = 'mobile:w-198 mobile:h-198'
  const desktopImageSize = 'desktop:w-300 desktop:h-300'

  return (
    <div
      className="mobile:px-20 desktop:px-60"
      key={id}>
      <div className="flex justify-center relative">
        <StandardVertex
          propsClass={`absolute text-black ${mobileImageSize} ${desktopImageSize}`}
        />
        <img
          className={` ${mobileImageSize} ${desktopImageSize}`}
          src={images[0].url || defaultAlbumImg}
          alt={name + 'image'}
        />
      </div>
      <div className="relative w-full desktop:h-120 mobile:h-90 overflow-hidden">
        <h1
          className={`absolute
                      mobile:text-40 mobile:top-10
                      desktop:top-10 desktop:left-0 desktop:text-60
                     ${name.length >= 15 ? 'text-flow-on-hover' : ''}`}>
          {name}
        </h1>
        <h2 className="absolute mobile:text-14 mobile:top-70 desktop:left-0 desktop:text-24 desktop:top-90">
          <p>
            {artists.map((artist, idx) => (
              <span
                key={idx}
                className="cursor-pointer hover:underline"
                onClick={() => handleClickAritst(artist.id)}>
                {artist.name}
                {idx < artists.length - 1 && ', '}
              </span>
            ))}{' '}
            • {release_date.split('-')[0]} • {total_tracks}곡,
            {` ${minutes}분 ${seconds}초`}
          </p>
        </h2>
      </div>
    </div>
  )
}

AlbumArtistInfo.__isStatic = true
