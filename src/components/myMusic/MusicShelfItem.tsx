import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import { StandardVertex } from '@/assets'
import { BillGraph } from '..'
import graphBgImg from '@/assets/imgs/graphBackground.png'

export const MusicShelfItem = ({ data }) => {
  const navigate = useNavigate()
  const { id, name } = data
  const isSpotify = !data.analysis
  const total = isSpotify ? data.tracks.items.length : data.tracks.length

  const handleClickPlaylist = () => {
    navigate(`/mymusic/shelf/${id}`)
  }

  return (
    <li
      className="group flex  items-center border-b-1 w-full h-62 hover:bg-mainGray300 cursor-pointer"
      onClick={handleClickPlaylist}>
      <div className="relative my-8 ml-10 mr-12 cursor-pointer w-44">
        {isSpotify ? (
          <img
            src={data.images ? data.images[0].url : defaultAlbumImg}
            alt={`${name}.img`}
            className="h-44"
          />
        ) : (
          <div
            className="bg-mainWhite w-44 bg-no-repeat bg-[43%_-10%] bg-[length:43px]"
            style={{ backgroundImage: `url(${graphBgImg})` }}>
            <BillGraph
              analysisList={data.analysis}
              color={data.color}
              isSmall
            />
          </div>
        )}
        <StandardVertex propsClass="h-44 absolute top-0 text-mainBlack group-hover:text-mainGray300" />
      </div>
      <p className="text-14 desktop:text-16 truncate w-230 group-hover:underline ">
        {name} ({total})
      </p>
    </li>
  )
}
