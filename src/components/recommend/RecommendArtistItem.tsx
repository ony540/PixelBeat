import { StandardPixelBorder, StandardVertex } from '@/assets'

export const RecommendArtistItem = ({ artist, isSelected, onClick }) => (
  <div
    key={artist.id}
    className="mb-20"
    onClick={() => onClick(artist.id)}>
    <div className="relative">
      <img
        src={artist.images[0].url}
        alt={artist.name}
        className="w-48 h-48 absolute top-16 left-32 desktop:left-62 cursor-pointer"
      />
      <StandardVertex propsClass="text-black w-48 h-48 top-16 absolute left-32 desktop:left-62" />
      <StandardPixelBorder
        propsClass={`px-20 cursor-pointer ${isSelected ? 'selected-item' : ''}`}
      />
      <div
        className={`absolute left-100 desktop:left-130 top-24 ${
          isSelected ? 'selected-item' : ''
        } text-xl cursor-pointer`}>
        {artist.name}
      </div>
    </div>
  </div>
)
