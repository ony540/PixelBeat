import { useNavigate } from 'react-router-dom'
import { BillGraph } from '..'
import graphBgImg from '@/assets/imgs/graphBackground.png'

export const SimilarUserBill = ({ data, isDrag }) => {
  const navigate = useNavigate()
  const { owner, analysis, color, id } = data

  const handleClickGraph = () => {
    if (!isDrag) {
      navigate(`/bill/${id}/${owner.userId}`)
    }
  }

  const handleClickUser = (event: React.MouseEvent<HTMLHeadingElement>) => {
    if (!isDrag) {
      event.stopPropagation()
      navigate(`/profile/${owner.userId}`)
    }
  }

  return (
    <li
      className="flex cursor-pointer"
      onClick={handleClickGraph}>
      <div className="w-160 h-186 bg-white">
        <h3
          onClick={handleClickUser}
          className="bg-mainGray text-center text-black h-26 leading-28 desktop:text-18 hover:underline">
          {owner.username}
        </h3>
        <div
          className="bg-mainWhite my-0 mx-auto mt-14 w-132 bg-no-repeat bg-[43%_-10%] bg-[length:129px]"
          style={{ backgroundImage: `url(${graphBgImg})` }}>
          <BillGraph
            analysisList={analysis}
            color={color}
            isSmall
          />
        </div>
      </div>
    </li>
  )
}
