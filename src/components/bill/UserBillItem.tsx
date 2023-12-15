import { CirclePlaySmall, StandardVertex } from '@/assets'
import { Track } from '@/types'
import { msToMinutesAndSeconds } from '@/utils'
import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import { useNowPlayStore } from '@/zustand'

export const UserBillItem = ({
  track,
  trackNumber
}: {
  track: Track
  trackNumber: number
}) => {
  const navigate = useNavigate()
  const { minutes, seconds } = msToMinutesAndSeconds(track.duration_ms)

  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const addTrackToNowPlay = useNowPlayStore(state => state.addTrackToNowPlay)

  const handleClickPreviewPlayButton = (track: Track) => {
    addTrackToNowPlay(track)
    setCurrentTrack(track)
  }

  const handleClickAritst = (id: string) => {
    navigate(`/artist/${id}`)
  }

  const handleClickAlbum = () => {
    navigate(`/album/${track.album.id}`)
  }

  return (
    <li className="group mx-16 h-48 text-left text-16 flex items-center justify-between hover:bg-bgGray ">
      <div className="flex items-center">
        <span className="w-34 mr-10 text-center">
          {String(trackNumber + 1).padStart(2, '0')}
        </span>
        {/* 앨범이미지 */}
        <div
          onClick={handleClickAlbum}
          className="relative mr-8 cursor-pointer w-36">
          <img
            src={track.album.images[2].url || defaultAlbumImg}
            alt={track.album.name}
            className="h-36"
          />
          <StandardVertex propsClass="h-36 absolute top-0 text-mainWhite group-hover:text-bgGray" />
        </div>

        <div className="leading-[1.2] inline-block w-154 overflow-hidden ">
          <div
            className={`${
              track.name.length >= 22 ? 'text-flow-on-hover' : ''
            }`}>
            <h3>{track.name}</h3>
          </div>
          <p
            className={`${
              track.artists.length >= 2
                ? 'text-flow-on-hover self-end text-14'
                : 'self-end text-14'
            }`}>
            {track.artists.map((artist, idx) => (
              <span
                key={idx}
                className="cursor-pointer hover:underline"
                onClick={() => handleClickAritst(artist.id)}>
                {artist.name}
                {idx < track.artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="pr-3 flex">
        {track.preview_url && (
          <button
            className="opacity-0 group-hover:opacity-100 mr-18"
            onClick={() => handleClickPreviewPlayButton(track)}>
            <CirclePlaySmall />
          </button>
        )}

        <p className="mt-4">{`${minutes}:${seconds}`}</p>
      </div>
    </li>
  )
}
