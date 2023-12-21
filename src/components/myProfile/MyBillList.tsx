import { MyProfileBillBtn, MiniBill, Heart } from '@/assets'
import { SmallBill } from '.'
import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { getBill } from '@/api'

export const MyBillList = () => {
  const navigate = useNavigate()
  const userProfile = useUserInfo().userInfo

  // getBill
  const moveToLike = () => {
    navigate('/profile/like')
  }

  const moveToBill = id => {
    navigate(`/bill/${id}`)
  }

  const QueryBillItem = ({ id, moveToBill }) => {
    const { data }: any = useQuery({
      queryKey: ['my-bill', id],
      queryFn: () => getBill(id as string)
    })

    const totalDuration = data?.tracks.reduce(
      (sum, item) => sum + item.duration_ms,
      0
    )

    return (
      <SmallBill
        onClick={() => moveToBill(id)}
        id={id}
        track_length={data?.tracks.length}
        duration_ms={totalDuration}
      />
    )
  }

  return (
    <div className="px-20 desktop:px-60 pt-24 min-h-[80vh] mb-[200px]">
      <div className="flex flex-row ">
        <div className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            width={140}
            height={35}
            textColor="black"
            text={'내 영수증'}
            fillColor1={'white'}
          />
          <div className="absolute top-10 left-12">
            <MiniBill fillColor="black" />
          </div>
        </div>

        <div
          onClick={moveToLike}
          className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            height={35}
            textColor="mainWhite"
            text={'좋아요 영수증'}
            fillColor1={'black'}
          />
          <div className="absolute top-11 left-12">
            <Heart fillColor="white" />
          </div>
        </div>
      </div>

      <div
        className="border-1 h-auto pb-40 grid min-h-[500px] 
                   grid-cols-2 grid-auto-rows-auto justify-center 
                   gap-10 px-10 
                   desktop:gap-40 desktop:px-30
                   ">
        {userProfile &&
          userProfile?.own_tracklist.map(item => (
            <QueryBillItem
              key={item}
              id={item}
              moveToBill={moveToBill}
            />
          ))}
      </div>
    </div>
  )
}
