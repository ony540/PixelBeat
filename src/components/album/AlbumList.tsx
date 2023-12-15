import { TrackItem } from '..'

export const AlbumList = ({ album_list }) => {
  if (!album_list) return null

  const albumData = {
    id: album_list.id,
    images: album_list.images,
    name: album_list.name
  }

  return (
    <div className="mobile:px-20 desktop:px-60 mt-20 mx-auto ">
      <ul className="border-b-1 relative">
        {album_list &&
          album_list.tracks.items.map(item => (
            <TrackItem
              key={item.id}
              data={{ ...item, album: albumData }}
            />
          ))}
      </ul>
    </div>
  )
}
