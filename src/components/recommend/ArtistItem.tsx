import { StandardPixelBorder, StandardVertex } from '..'

export const ArtistItem = ({ artist, isSelected, onClick }) => (
  <div
    key={artist.id}
    className="mb-20"
    onClick={() => onClick(artist.id)}>
    <div className="relative">
      <img
        loading="lazy"
        src={artist.images[0].url}
        alt={artist.name}
        className="w-48 h-48 absolute left-[12%] top-[20%] cursor-pointer"
      />

      <StandardVertex propsClass="h-48 absolute left-[12%] top-[20%]" />
      <StandardPixelBorder
        propsClass={`w-[86%] mx-auto my-0 cursor-pointer ${
          isSelected ? 'selected-item' : ''
        }`}
      />
      <div
        className={`absolute left-[28%] top-[30%] ${
          isSelected ? 'selected-item' : ''
        } text-xl cursor-pointer`}>
        {artist.name}
      </div>
    </div>
  </div>
)
