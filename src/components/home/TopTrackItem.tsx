import { CirclePlaySmall } from '@/assets'
import { StandardPixelBorder, StandardVertex } from '@/components'
import { Track } from '@/types'
import { useNowPlayStore } from '@/zustand'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'

export const TopTrackItem = ({ tracks }) => {
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)

  const handleClickPlayButton = (track: Track) => {
    setCurrentTrack(track)
  }

  return (
    <div className="top-track-grid overflow-y-hidden h-295 mb-100 mt-16">
      {tracks &&
        tracks.map((item, idx) => (
          <div
            className="group relative mobile:h-60 mobile:w-330 desktop:h-60 desktop:w-[450px] hover:bg-"
            key={item + idx}>
            <StandardPixelBorder isHeight={66} />
            <img
              src={
                item.track.album
                  ? item.track.album?.images[2]?.url
                  : defaultAlbumImg
              }
              loading="lazy"
              className="absolute w-48 h-48 left-10 top-9"
            />
            <StandardVertex propsClass="absolute w-48 h-48 left-10 top-9" />
            <p className="absolute top-20 left-59 desktop:left-62 w-30 text-center">
              {idx + 1}
            </p>
            <div
              className={`absolute whitespace-nowrap mobile:top-12 desktop:top-10 ${
                idx >= 9 ? 'left-105' : 'left-90 desktop:left-100'
              } w-190 desktop:w-[280px] overflow-hidden text-18 desktop:text-20 leading-[1.2]`}>
              <div
                className={`${
                  item.track.name.length > 26 ? 'text-flow-on-hover' : ''
                }`}>
                <p>{item.track.name}</p>
              </div>
              <p className=" text-14 desktop:text-16">
                {item.track.artists[0].name}
              </p>
            </div>
            {item.track.preview_url && (
              <button
                className="absolute top-20 right-18 "
                onClick={() => handleClickPlayButton(item.track)}>
                <CirclePlaySmall
                  isWhite
                  isBig
                />
              </button>
            )}
          </div>
        ))}
    </div>
  )
}
