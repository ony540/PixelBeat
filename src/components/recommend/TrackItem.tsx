import { StandardPixelBorder, StandardVertex } from '..'

export const TrackItem = ({ id, onClick, track, isSelected }) => (
  <div
    key={id}
    className="mb-20 relative flex gap-20"
    onClick={() => onClick(track.id)}>
    <img
      loading="lazy"
      src={track.album.images[0].url}
      alt={`${track.name} + image`}
      className="w-48 h-48 absolute left-[12%] top-[20%]"
    />

    {/* SVG */}
    <StandardVertex propsClass={`h-48 absolute left-[12%] top-[20%]`} />
    <StandardPixelBorder
      propsClass={`w-[86%] mx-auto my-0 cursor-pointer ${
        isSelected ? 'selected-item' : ''
      }`}
    />

    {/* 노래 제목 */}
    <div
      className={`absolute left-[28%] top-[12%] overflow-hidden w-[60%] ${
        isSelected ? 'selected-item' : ''
      }`}>
      <div className={`${track.name.length >= 40 ? 'text-flow-on-hover' : ''}`}>
        <p>{track.name}</p>
      </div>
    </div>

    {/* 아티스트 이름 */}
    <div
      className={`absolute left-[28%] top-[50%] ${
        isSelected ? 'selected-item' : ''
      }`}>
      {track.artists[0].name}
    </div>
  </div>
)
