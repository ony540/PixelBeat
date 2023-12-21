import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'

export const ArtistItem = ({ data,isDrag }: any) => {
  const navigate = useNavigate()

  return (
    <li
      className="my-6 mr-8 flex flex-col datas-center w-150 h-176 cursor-pointer group"
      onClick={() => {if(!isDrag) navigate(`/artist/${data.id}`)}}>
      <div className="w-150 border-[1.4px] border-b-0  h-156 overflow-y-hidden">
        <img
          loading="lazy"
          className="w-150 h-156"
          src={data.images[1] ? data.images[1].url : defaultAlbumImg}
          alt={`${data.name}.img`}
        />
      </div>
      <div className="bg-mainGray whitespace-nowrap w-full text-center text-mainBlack group-hover:underline truncate">
        {data.name}
      </div>
    </li>
  )
}
