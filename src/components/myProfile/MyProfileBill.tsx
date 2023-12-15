import {
  MyProfileBillBtn,
  FullHeart,
  MiniBill,
  Heart,
} from '@/assets'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StandardVertex } from '..'

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
        <div
          onClick={goToMyBill}
          className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            propsClass="flex flex-row"
            width={140}
            height={35}
            textColor="black"
            text={'내 영수증'}
            fillColor1={'white'}
            fillColor2={'white'}
            textPadding={15}
          />
          <div className="absolute top-10 left-12">
            <MiniBill fillColor="black" />
          </div>
        </div>
        <div
          onClick={goToLike}
          className="cursor-pointer relative flex">
          <MyProfileBillBtn
            type="submit"
            propsClass=""
            height={35}
            textColor="mainWhite"
            text={'좋아요 영수증'}
            fillColor1={'black'}
          />
          <div className=' absolute top-11 left-14'>
            <Heart fillColor='white'/>
          </div>
        </div>
      </div>
      <div className="mx-20 border h-auto flex flex-wrap">
        <div className="profileBill ml-78 bg-mainWhite w-162 mb-10 mt-30 text-mainBlack text-center leading-tight">
          <h1
            className="text-14 w-140 h-30 m-auto text-center"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              maxHeight: '2rem'
            }}>
            빵빵이의 영수증
          </h1>{' '}
          <div className="flex-col mobile:w-124 mobile:h-124 flex-shrink-0 bg-mainGray relative mx-19 mt-8">
            <StandardVertex propsClass={`absolute`} />
            <img
              loading="lazy"
              className={`w-124 h-124`}
              src=""
              alt=""
            />
          </div>
          <div className="flex justify-between h-26 leading-25 border-mainBlack border-y mx-11 mt-12 border-dashed text-12 text-start">
            <div>8곡 • 10:38</div>{' '}
            <button onClick={() => toggleLike(0)}>
              <FullHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
