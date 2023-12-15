import { StandardVertex, FullHeart } from '@/assets'
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
    <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center leading-tight">
      <h1
        className="text-14 w-140 h-36 m-auto text-center flex justify-center overflow-hidden text-ellipsis items-center"
        style={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2
        }}>
        :id의 영수증 #1
      </h1>{' '}
      {/* 좋아요한 영수증이나 나의 영수증 */}
      <div className="flex-col mobile:w-124 mobile:h-124 flex-shrink-0 bg-mainGray relative mx-19 mt-8">
        <StandardVertex propsClass={`absolute text-mainWhite`} />
        <img
          loading="lazy"
          className={`w-124 h-124`}
          src=""
          alt=""
        />
      </div>
      <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
        <div>8곡 • 10:38</div> {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
        <button onClick={() => toggleLike(0)}>
          <FullHeart />
        </button>
      </div>
    </div>
  )
}
