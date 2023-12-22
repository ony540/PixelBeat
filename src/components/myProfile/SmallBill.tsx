import {
  LikeCountProps,
  LikeProps,
  updateBillLikes,
  updateLikedTracklist
} from '@/api'
import { StandardVertex, SmallBillSide } from '@/assets'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { BillGraph, HeartButton } from '..'
import graphBgImg from '@/assets/imgs/graphBackground.png'
import { useUserStore } from '@/zustand'
import { msToMinutesAndSeconds } from '@/utils'

export const SmallBill = ({
  id,
  onClick,
  data
}: {
  id?: string
  onClick?: any
  data: any
}) => {
  const userProfile = useUserStore(state => state.userInfo)
  const queryClient = useQueryClient()
  const [isHearted, setIsHearted] = useState(
    userProfile?.liked_tracklist.includes(id!)
  )

  //좋아요
  const likeBillMutation = useMutation<any[], Error, LikeProps>({
    mutationFn: updateLikedTracklist,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userProfile.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  //좋아요 수 제어
  const likeCountBillMutation = useMutation<any[], Error, LikeCountProps>({
    mutationFn: updateBillLikes,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['bill', id, userProfile.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  // 좋아요 버튼 누르기
  const handleClickHeartButton = () => {
    setIsHearted(prevIsHearted => !prevIsHearted)

    likeCountBillMutation.mutateAsync({
      prevLikes: likes,
      billId: id!,
      isAdd: !isHearted
    })
    likeBillMutation.mutateAsync({
      prevLikedTracklist: userProfile.liked_tracklist,
      billId: id!,
      userId: userProfile.id
    })
  }

  const { name, likes } = data

  const totalDuration = data?.tracks.reduce(
    (sum, item) => sum + item.duration_ms,
    0
  )

  const { minutes, seconds } = msToMinutesAndSeconds(Number(totalDuration))

  return (
    <div
      className="bg-mainWhite mt-30 relative w-150 h-200 text-center text-mainBlack 
                desktop:w-[250px] desktop:h-[300px]">
      <SmallBillSide className="absolute top-[-15px]" />

      {data && (
        <>
          <p
            onClick={() => onClick(id)}
            className=" flex flex-col mx-auto text-center overflow-hidden
                        cursor-pointer hover:underline
                        desktop:text-20 desktop:w-180 desktop:h-60 desktop:mt-15                        
                        text-14 w-140 h-38
                        ">
            {name || `${data?.owner?.username}의 영수증`}
          </p>

          <div
            className="flex-col w-100 h-100 mt-10
                      desktop:w-160 desktop:h-160 desktop:mt-0
                      relative mx-auto">
            <StandardVertex propsClass={`absolute text-mainWhite`} />

            <div
              className="my-0 mx-auto bg-no-repeat bg-[43%_-10%] 
              w-100 mt-0 bg-[length:98px]
              desktop:w-132 desktop:mt-14 desktop:bg-[length:129px]"
              style={{ backgroundImage: `url(${graphBgImg})` }}>
              <BillGraph
                analysisList={data?.analysis}
                color={data?.color}
                isSmall={true}
              />
            </div>
          </div>

          <div
            className="flex justify-between items-center border-y border-dashed
                  desktop:mx-25 desktop:mt-0 desktop:py-20 desktop:h-20
                  mx-11 mt-10 py-2
                 border-mainBlack ">
            <p
              className="text-14 flex items-center
            desktop:text-20 desktop:ml-10">
              {`${data?.tracks.length}곡 • ${minutes}분 ${seconds}초`}
            </p>
            <HeartButton
              isHearted={isHearted}
              onClick={handleClickHeartButton}
            />
          </div>
          <SmallBillSide className="absolute bottom-[-15px] rotate-180" />
        </>
      )}
    </div>
  )
}
