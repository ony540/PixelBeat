import { MoreIcon } from '@/assets'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import { useModal } from '@/hooks'
import { useNavigate } from 'react-router-dom'

export const PlaylistItem = ({ data, setSelectedPlaylist }: any) => {
  const navigate = useNavigate()
  const { openModal } = useModal()

  const handleClickMoreButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openModal('playlistMore')
    setSelectedPlaylist(data)
  }

  return (
    <>
      <li
        className="relative group cursor-pointer hover:bg-mainGray300"
        key={data.id}
        onClick={() => navigate(`/bill/playlist/${data.id}`)}>
        <div className="border-1 border-b-0 flex items-center gap-10 ">
          <img
            className="w-50 h-51 mr-4 
                 desktop:w-65 desktop:h-66"
            src={data.images[0] ? data.images[0].url : defaultAlbumImg}
            alt={`${data.name}.img`}
          />
          <p className="group-hover:underline truncate w-246 desktop:w-470 desktop:text-20">
            {data.name}
          </p>
          <button
            type="button"
            onClick={handleClickMoreButton}
            className="absolute right-10">
            <MoreIcon />
          </button>
        </div>
      </li>
    </>
  )
}
