import { StandardPixelBorder, StandardVertex } from '..'

export const TopTrackItem = ({ tracks }) => {
  return (
    <div className="top-track-grid overflow-y-hidden h-295 mb-100 mt-16">
      {tracks &&
        tracks.map((items, idx) => (
          <div
            className="relative mobile:h-60 mobile:w-330 desktop:h-60 desktop:w-[450px]"
            key={items + idx}>
            <StandardPixelBorder isHeight={66} />
            <img
              src={items.track.album ? items.track.album?.images[2]?.url : ''}
              loading="lazy"
              className="absolute w-48 h-48 left-10 top-9"
            />
            <StandardVertex propsClass="absolute w-48 h-48 left-10 top-9" />
            <p className="absolute top-20 left-70 ">{idx + 1}</p>
            <div
              className={`absolute whitespace-nowrap mobile:top-12 desktop:top-6 ${
                idx >= 9 ? 'left-105' : 'left-90'
              } w-[210px] desktop:w-[310px] overflow-hidden`}>
              <div
                className={`${
                  items.track.name.length > 30 ? 'text-flow-on-hover' : ''
                }`}>
                <p>{items.track.name}</p>
              </div>
            </div>
            <div
              className={`absolute top-30 whitespace-nowrap ${
                idx >= 9 ? 'left-105' : 'left-90'
              } mobile:w-[250px] desktop:w-[500px]`}>
              {items.track.artists[0].name}
            </div>
          </div>
        ))}
    </div>
  )
}

