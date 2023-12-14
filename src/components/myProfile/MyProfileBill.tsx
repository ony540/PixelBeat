import { BillHeart, MyBill, Heart, FullHeart } from '@/assets'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MyProfileBill = () => {
  const navigate = useNavigate()
  const goToLike = () => {
    navigate('/profile/:id/profilelike')
  }
  const goToMyBill = () => {
    navigate('/profile/:id/profile')
  }
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
    <div className="desktop:px-60 pt-24">
      <div className="flex flex-row ml-20">
        <button onClick={goToMyBill}>
          <MyBill />
        </button>
        <button onClick={goToLike}>
          <BillHeart />
        </button>
      </div>
      <div className="mx-20 border h-auto flex flex-wrap">
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(0)}>
              {likes[0] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(1)}>
              {likes[1] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(2)}>
              {likes[2] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(3)}>
              {likes[3] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(4)}>
              {likes[4] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(5)}>
              {likes[5] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(6)}>
              {likes[6] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center">
          <h1
              className="text-14 w-140 m-auto text-center"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2
              }}>
              누군가 영수증 #1 죄송합니다 죄송합니다 죄송합니다 죄송합니다 죄송합니다
            </h1>{' '}
          {/* 좋아요한 영수증이나 나의 영수증 */}
          <img
            className="bg-mainGray w-124 h-124 mx-19 mt-8"
            src=""
            alt=""
          />
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            {/* 플리에 들어있는곡 수 + 곡들의 시간 총합 */}
            <button onClick={() => toggleLike(7)}>
              {likes[7] ? <FullHeart /> : <Heart />}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
