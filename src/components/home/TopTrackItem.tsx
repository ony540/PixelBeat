import { StandardPixelBorder, StandardVertex } from '..'

export const TopTrackItem = ({ tracks }) => {
  return (
    <div className="top-track-grid mt-6 mb-100">
      {tracks &&
        tracks.map((items, idx) => (
          <div
            className="relative"
            key={items + idx}>
            <StandardPixelBorder
              propsClass="mobile:h-60 mobile:w-330 desktop:h-80 desktop:w-[450px]"
              isHeight={'100%'}
            />
            <img
              src={items.track.album ? items.track.album?.images[0]?.url : ''}
              loading="lazy"
              className="absolute mobile:w-48 mobile:h-48 mobile:top-7 mobile:left-10 desktop:w-60 desktop:h-60 desktop:left-12 desktop:top-10"
            />
            <StandardVertex propsClass="absolute mobile:w-48 mobile:h-48 mobile:top-7 mobile:left-10 desktop:w-60 desktop:h-60 desktop:left-12 desktop:top-10" />
            <p className="absolute mobile:top-18 mobile:left-70 desktop:top-25 desktop:left-90">
              {idx + 1}
            </p>
            <div
              className={`absolute whitespace-nowrap mobile:top-8 desktop:top-10 ${
                idx >= 9
                  ? 'mobile:left-100  desktop:left-130'
                  : 'mobile:left-90 desktop:left-120'
              } mobile:w-[210px] desktop:w-[300px] overflow-hidden`}>
              <div
                className={`${
                  items.track.name.length > 30 ? 'text-flow-on-hover' : ''
                }`}>
                <p>{items.track.name}</p>
              </div>
            </div>

            <div
              className={`absolute mobile:top-30 desktop:top-38 whitespace-nowrap ${idx >= 9 ? 'mobile:left-100 desktop:left-130' : 'mobile:left-90 desktop:left-120'} mobile:w-[250px] desktop:w-[500px]`}>
              {items.track.artists[0].name}
            </div>
          </div>
        ))}
    </div>
  )
}
