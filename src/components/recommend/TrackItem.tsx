import { StandardPixelBorder, StandardVertex } from '..'

export const TrackItem = ({ id, onClick, track, isSelected }) => (
  <div
    key={id}
    className="relative mb-20 cursor-pointer"
    onClick={() => onClick(track.id)}>
    <img
      loading="lazy"
      src={track.album.images[0].url}
      alt={`${track.name} + image`}
      className="w-48 h-48 absolute top-16 mobile:left-32 desktop:left-62"
    />

    {/* SVG */}
    <StandardVertex propsClass={`w-48 h-48 absolute top-16 mobile:left-32 desktop:left-62`} />
    <StandardPixelBorder
      propsClass={`px-20 ${
        isSelected ? 'selected-item' : ''
      }`}
    />

    {/* 노래 제목 */}
    <div
      className={`absolute top-12 whitespace-nowrap mobile:left-100 desktop:left-130 mobile:w-[250px] desktop:w-[500px] overflow-hidden ${
        isSelected ? 'selected-item' : ''
      }`}>
      <div className={`${track.name.length >= 40 ? 'text-flow-on-hover' : ''}`}>
        <p>{track.name}</p>
      </div>
    </div>

    {/* 아티스트 이름 */}
    <div
      className={`absolute top-40 whitespace-nowrap mobile:left-100 desktop:left-130 mobile:w-[250px] desktop:w-[500px] ${
        isSelected ? 'selected-item' : ''
      }`}>
      {track.artists[0].name}
    </div>
  </div>
)
