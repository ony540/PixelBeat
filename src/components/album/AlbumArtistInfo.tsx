import { StandardVertex } from '..'

export const AlbumArtistInfo = ({ album_data }) => {
  if (!album_data) {
    return null
  }

  const { id, name, artists, release_date, total_tracks, images, tracks } =
    album_data

  const convertMillisecondsToMinutesAndSeconds = milliseconds => {
    const totalSeconds = milliseconds / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return { minutes, seconds }
  }
  
  const formatTime = (minutes, seconds) => {
    return ` ${minutes}분 ${seconds}초`
  }

  const firstTrackDuration = tracks.items[0].duration_ms

  const { minutes, seconds } =
    convertMillisecondsToMinutesAndSeconds(firstTrackDuration)

  const mobileImageSize = 'mobile:w-198 mobile:h-198'
  const desktopImageSize = 'desktop:w-300 desktop:h-300'

  return (
    <div
      className="mobile:px-20 desktop:px-60"
      key={id}>
      <div className="flex justify-center relative">
        <StandardVertex
          propsClass={`absolute ${mobileImageSize} ${desktopImageSize}`}
        />
        <img
          className={` ${mobileImageSize} ${desktopImageSize}`}
          src={images[0].url}
          alt={name + 'image'}
        />
      </div>
      <div className="relative w-full desktop:h-120 mobile:h-90 overflow-hidden">
        <h1
          className={`absolute
                      mobile:text-40 mobile:top-10
                      desktop:top-10 desktop:left-0 desktop:text-60
                     ${name.length >= 20 ? 'text-flow-on-hover' : ''}`}>
          {name}
        </h1>
        <h2 className="absolute mobile:text-14 mobile:top-70 desktop:left-0 desktop:text-24 desktop:top-90">
          <p>
            {artists[0].name} • {release_date.split('-')[0]} • {total_tracks}곡,
            {formatTime(minutes, seconds)}
          </p>
        </h2>
      </div>
    </div>
  )
}