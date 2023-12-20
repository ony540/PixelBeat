import { getBill } from '@/api'
import { StandardVertex, FullHeart, SmallBillSide } from '@/assets'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { BillGraph } from '..'
import graphBgImg from '@/assets/imgs/graphBackground.png'

export const SmallBill = ({ id, onClick }: { id?: string; onClick?: any }) => {
  const [likes, setLikes] = useState([false, false])

  // 좋아요 상태를 토글하는 함수
  const toggleLike = index => {
    setLikes(prevLikes => {
      const newLikes = [...prevLikes]
      newLikes[index] = !newLikes[index]
      return newLikes
    })
  }

  const { data } = useQuery({
    queryKey: ['my-bill', id],
    queryFn: () => getBill(id as string)
  })

  return (
    <div
      className="bg-mainWhite mt-30 relative 
      text-mainBlack text-center
        mobile:w-162 mobile:h-200 
        desktop:w-[250px] desktop:h-[300px]">
      <SmallBillSide className="absolute top-[-15px]" />

      {data && (
        <>
          <h1
            onClick={() => onClick(id)}
            className=" flex flex-col mx-auto text-center overflow-hidden
                    cursor-pointer hover:underline
                    desktop:text-20 desktop:w-180 desktop:h-60
                    mobile:text-14 mobile:w-140 mobile:h-36 ">
            {data?.owner?.username || ''}의 영수증
          </h1>

          <div
            className="flex-col 
                      mobile:w-100 mobile:h-100 mobile:mt-10
                      desktop:w-160 desktop:h-160 desktop:mt-0
                      relative mx-auto">
            <StandardVertex propsClass={`absolute text-mainWhite`} />

            <div
              className="my-0 mx-auto bg-no-repeat bg-[43%_-10%] 
              mobile:w-100 mobile:mt-0 mobile:bg-[length:100px]
              desktop:w-132 desktop:mt-14 desktop:bg-[length:129px] "
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
                  desktop:mx-25 desktop:mt-10 desktop:py-26 desktop:h-26 desktop:leading-26
                  mobile:mx-11 mobile:mt-20 
                 border-mainBlack ">
            <p className="mobile:text-16 desktop:text-20 desktop:ml-10 flex items-center">
              8곡 • 10:38
            </p>
            <FullHeart onClick={() => toggleLike(0)} />
          </div>
          <SmallBillSide className="absolute bottom-[-15px] rotate-180" />
        </>
      )}
    </div>
  )
}
