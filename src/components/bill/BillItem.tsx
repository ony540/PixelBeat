import { CirclePlaySmall } from '@/assets'
import { Track } from '@/types'
import { msToMinutesAndSeconds } from '@/utils'

export const BillItem = ({
  track,
  onClickPlayButton,
  trackNumber
}: {
  track: Track
  onClickPlayButton: () => void
  trackNumber: number
}) => (
  <li className="group mx-16 h-48 text-left text-16 flex items-center justify-between hover:bg-bgGray ">
    <div className="flex items-center">
      <span className="ml-8 mr-22">
        {String(trackNumber + 1).padStart(2, '0')}
      </span>
      <div className="leading-[1.2] inline-block w-194 overflow-hidden ">
        <div
          className={`${track.name.length >= 28 ? 'text-flow-on-hover' : ''}`}>
          <h3>{track.name}</h3>
        </div>
        <p
          className={`${
            track.artists.length >= 3
              ? 'text-flow-on-hover self-end text-14'
              : 'self-end text-14'
          }`}>
          {track.artists.map((artist, idx) => (
            <span key={idx}>
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
          className="hidden group-hover:block mr-18"
          onClick={onClickPlayButton}>
          <CirclePlaySmall />
        </button>
      )}

      <p className="mt-4">{msToMinutesAndSeconds(track.duration_ms)}</p>
    </div>
  </li>
)
