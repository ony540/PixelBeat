import { CirclePlaySmall } from '@/assets'
import { msToMinutesAndSeconds } from '@/utils'

export const BillItem = ({ id, tracks, onClick, trackNumber }) => (
  <div
    key={id}
    className="group mx-16 h-48 text-left text-16 flex items-center justify-between hover:bg-bgGray hover:cursor-pointer">
    <div className="flex items-center">
      <span className="ml-8 mr-22">
        {String(trackNumber + 1).padStart(2, '0')}
      </span>
      <div className="leading-[1.2] inline-block overflow-hidden w-[80%]">
        <div
          className={`${tracks.name.length >= 30 ? 'text-flow-on-hover' : ''}`}>
          <h3>{tracks.name}</h3>
        </div>
        <p className="self-end text-14">{tracks.artists[0].name}</p>
      </div>
    </div>

    <div className="pr-3 flex">
      {tracks.preview_url && (
        <button
          className="hidden group-hover:block mr-18"
          onClick={() => onClick(tracks)}>
          <CirclePlaySmall />
        </button>
      )}

      <p className="mt-4">{msToMinutesAndSeconds(tracks.duration_ms)}</p>
    </div>
  </div>
)
