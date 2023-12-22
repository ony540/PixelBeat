import { MyProfileBillBtn, MiniBill, Heart } from '@/assets'
import { SmallBill } from '.'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBill } from '@/api'
import { useUserStore } from '@/zustand'

export const MyLikeBillList = () => {
  const navigate = useNavigate()
  const userInfo = useUserStore(state => state.userInfo)
  const moteToMe = () => {
    navigate('/profile/me')
  }
  const moveToBill = (id: string, userId: string) => {
    navigate(`/bill/${id}/${userId}`)
  }

  const QueryBillItem = ({ id }) => {
    const { data, isLoading }: any = useQuery({
      queryKey: ['my-like-bill', id],
      queryFn: () => getBill(id as string)
    })

    if (isLoading) return null
    return (
      <SmallBill
        key={id}
        id={id}
        onClick={() => moveToBill(id, data.owner.userId)}
        data={data}
      />
    )
  }

  return (
    <div className="px-20 desktop:px-60 pt-24 min-h-[80vh] mb-[200px]">
      <div className="flex flex-row">
        <div
          onClick={moteToMe}
          className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            propsClass="flex flex-row"
            width={140}
            textColor="white"
            height={35}
            text={'내 영수증'}
            fillColor1={'black'}
            fillColor2={'white'}
          />
          <div className="absolute top-10 left-12">
            <MiniBill fillColor="white" />
          </div>
        </div>

        <div className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            height={35}
            textColor="black"
            text={'좋아요 영수증'}
            fillColor1={'white'}
            fillColor2={'white'}
          />
          <div className=" absolute top-11 left-14">
            <Heart fillColor="black" />
          </div>
        </div>
      </div>

      <div
        className="border-1 h-auto pb-40 grid min-h-[500px] 
             grid-cols-2 grid-auto-rows-auto justify-center 
             gap-x-6 gap-y-12 px-10 items-start
             desktop:gap-20 desktop:px-30
             justify-items-center">
        {userInfo &&
          userInfo?.liked_tracklist.map(item => (
            <QueryBillItem
              key={item}
              id={item}
            />
          ))}
      </div>
    </div>
  )
}
