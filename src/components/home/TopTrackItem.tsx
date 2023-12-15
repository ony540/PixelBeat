import { StandardPixelBorder, StandardVertex, CirclePlaySmall } from '@/assets'
import { Track } from '@/types'
import { useNowPlayStore } from '@/zustand'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'
import { useNavigate } from 'react-router-dom'

export const TopTrackItem = ({ tracks }) => {
  const navigate = useNavigate()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)

  const handleClickPlayButton = (track: Track) => {
    setCurrentTrack(track)
  }
  const handleClickAlbum = (id: string) => {
    navigate(`/album/${id}`)
  }

  const handleClickAritst = (id: string) => {
    navigate(`/artist/${id}`)
  }

  return (
    <ul className="top-track-grid overflow-y-hidden h-295 mb-100 mt-16">
      {tracks &&
        tracks.map((item, idx) => (
          <li
            className="group relative mobile:h-60 mobile:w-330 desktop:h-60 desktop:w-[450px] hover:bg-"
            key={item + idx}>
            <StandardPixelBorder isHeight={66} />
            <div
              className="w-48 h-48 absolute left-10 top-9  cursor-pointer"
              onClick={() => handleClickAlbum(item.track.album.id)}>
              <img
                src={
                  item.track.album
                    ? item.track.album?.images[2]?.url
                    : defaultAlbumImg
                }
                loading="lazy"
              />
              <StandardVertex propsClass="text-black absolute w-48 h-48 top-0" />
            </div>
            <p className="absolute top-20 left-59 desktop:left-62 w-30 text-center">
              {idx + 1}
            </p>
            <div
              className={`absolute whitespace-nowrap mobile:top-12 desktop:top-10 ${
                idx >= 9 ? 'left-105' : 'left-90 desktop:left-100'
              } w-180 desktop:w-[280px] overflow-hidden text-18 desktop:text-20 leading-[1.2]`}>
              <div
                className={`${
                  item.track.name.length > 26 ? 'text-flow-on-hover' : ''
                }`}>
                <p>{item.track.name}</p>
              </div>
              <p className=" text-14 desktop:text-16">
                {item.track.artists.map((artist, idx) => (
                  <span
                    key={idx}
                    className="cursor-pointer hover:underline"
                    onClick={() => handleClickAritst(artist.id)}>
                    {artist.name}
                    {idx < item.track.artists.length - 1 && ', '}
                  </span>
                ))}
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
          </li>
        ))}
    </ul>
  )
}
