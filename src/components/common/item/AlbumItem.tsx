import { useNavigate } from 'react-router-dom'
import { RectangleVertax } from '@/assets'
import defaultAlbumImg from '../../../assets/imgs/default_album_artist.png'

export const AlbumItem = ({ data, isDrag }: any) => {
  const navigate = useNavigate()

  return (
    <li
      onClick={() => {
        if (!isDrag) navigate(`/album/${data.id}`)
      }}
      className="flex-col w-150 h-176 flex-shrink-0 bg-mainGray cursor-pointer relative group">
      <RectangleVertax />
      {data.images && data.images.length > 0 && (
        <img
          loading="lazy"
          className={`w-150 h-150 cursor-pointer`}
          src={data.images[1].url || defaultAlbumImg}
          alt={`${data.name}.img`}
        />
      )}
      <p className="w-140 mx-auto h-26 text-center text-mainBlack desktop:text-16 group-hover:underline truncate">
        {data.name}
      </p>
    </li>
  )
}
