import { StandardVertex, FullHeart, SmallBillSide } from '@/assets'
import { useState } from 'react'

export const SmallBill = () => {
  // 각각의 profileBill에 대한 좋아요 상태를 배열로 관리
  const [likes, setLikes] = useState([false, false])

  // 좋아요 상태를 토글하는 함수
  const toggleLike = index => {
    setLikes(prevLikes => {
      const newLikes = [...prevLikes]
      newLikes[index] = !newLikes[index]
      return newLikes
    })
  }

  return (
    <div
      className="bg-mainWhite mt-30 relative
      text-mainBlack text-center
        mobile:w-162 mobile:h-200 
        desktop:w-[250px] desktop:h-[300px]">
      <SmallBillSide className="absolute top-[-15px]" />

      <h1
        className=" flex flex-col mx-auto text-center overflow-hidden
                    desktop:text-20 desktop:w-180 desktop:h-60
                    mobile:text-14 mobile:w-140 mobile:h-36 ">
        :id의 영수증 #1asdfasdfasdfasdfasdfasdfasdfw
      </h1>

      <div
        className="flex-col 
      mobile:w-100 mobile:h-100 mobile:mt-10
      desktop:w-160 desktop:h-160 desktop:mt-0
      bg-mainGray relative mx-auto">
        <StandardVertex propsClass={`absolute text-mainWhite`} />
        <img
          className="
          w-full h-full"
          src={''}
          alt={''}
        />
      </div>

      <div
        className="flex justify-between items-center border-y border-dashed
                  desktop:mx-25 desktop:mt-10 desktop:py-26 desktop:h-26 desktop:leading-26
                  mobile:mx-11 mobile:mt-20 
                 border-mainBlack ">
        <p className="mobile:text-16 desktop:text-20 desktop:ml-10">
          8곡 • 10:38
        </p>
        <FullHeart onClick={() => toggleLike(0)} />
      </div>
      <SmallBillSide className="absolute bottom-[-15px] rotate-180" />
    </div>
  )
}
