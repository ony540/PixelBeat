import { StandardPixelBorder, StandardVertex } from '@/assets'

export const RecommendTrackItem = ({ id, onClick, track, isSelected }) => (
  <div
    key={id}
    className="relative mb-20 cursor-pointer"
    onClick={() => onClick(track.id)}>
    <img
      src={track.album.images[0].url}
      alt={`${track.name} + image`}
      className="w-48 h-48 absolute top-16 left-32 desktop:left-62"
    />

    {/* SVG */}
    <StandardVertex
      propsClass={`text-black w-48 h-48 absolute top-16 left-32 desktop:left-62`}
    />
    <StandardPixelBorder
      propsClass={`px-20 ${isSelected ? 'selected-item' : ''}`}
    />

    {/* 노래 제목 */}
    <div
      className={`absolute top-12 whitespace-nowrap left-100 desktop:left-130 w-[250px] desktop:w-[432px] overflow-hidden ${
        isSelected ? 'selected-item' : ''
      }`}>
      <div className={`${track.name.length >= 38 ? 'text-flow-on-hover' : ''}`}>
        <p>{track.name}</p>
      </div>
    </div>

    {/* 아티스트 이름 */}
    <div
      className={`absolute top-40 whitespace-nowrap left-100 desktop:left-130 w-[250px] desktop:w-[500px] ${
        isSelected ? 'selected-item' : ''
      }`}>
      {track.artists[0].name}
    </div>
  </div>
)
