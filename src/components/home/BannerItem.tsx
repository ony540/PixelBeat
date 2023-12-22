import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'
import { useNavigate } from 'react-router-dom'
import { CirclePlay, RectangleVertax, Spinner } from '@/assets'

//호버하면 재생버튼 나오고 클릭하면 다 지금 재생목록에 담기면서 바 나오기
export const BannerItem = ({ result }) => {
  const navigate = useNavigate()

  const { id, name, images } = result.data || {
    id: '',
    name: '',
    images: [{ url: '' }]
  }

  const handleClickBanner = ({
    e,
    id
  }: {
    e: React.MouseEvent<HTMLButtonElement>
    id: string
  }) => {
    e.stopPropagation()
    navigate(`/bill/playlist/${id}`)
  }

  if (result.isLoading) return <Spinner />

  return (
    <div className="group relative w-full h-383 ">
      <div
        className="w-full absolute h-385 top-[-1px] group-hover:bg-mainBlackOpacity transition-all
">
        <RectangleVertax height="385" />
      </div>
      <img
        className={`object-cover w-full h-383`}
        src={images[0] ? images[0].url : defaultAlbumImg}
        alt={name + 'image'}
      />
      <h2 className="opacity-0 group-hover:opacity-100 absolute left-40 top-40 w-270 leading-[1.1] text-36">
        {name}
      </h2>
      <button
        type="button"
        className="opacity-0 group-hover:opacity-100 absolute right-40 bottom-40 text-mainGreen transition-all"
        onClick={e => handleClickBanner({ e, id })}>
        <CirclePlay />
      </button>
    </div>
  )
}
