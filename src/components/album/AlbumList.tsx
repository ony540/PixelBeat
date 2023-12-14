import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'

export const AlbumList = ({ album_list }) => {
  const navigate = useNavigate()

  if (!album_list) {
    return null
  }

  return (
    <div className="mobile:px-20 desktop:px-60 mb-100 mt-20 mx-auto ">
      <div className="border-b-1">
        {album_list &&
          album_list.tracks.items.map(item => (
            <div
              key={item.id}
              className="border-1 border-b-0 flex items-center gap-10">
              <img
                className="mobile:w-50 mobile:h-51 mr-4 desktop:w-65 desktop:h-66"
                src={album_list.images[1].url || defaultAlbumImg}
                alt={`${item.name}.img`}
              />
              <div className="flex flex-col overflow-hidden">
                <span
                  className={item.name.length > 30 ? 'text-flow-on-hover' : ''}>
                  {item.name}
                </span>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate(`/artist/${item.artists[0].id}`)}>
                  {item.artists[0].name}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
