import {
  MyProfileBillBtn,
  MiniBill,
  Heart
} from '@/assets'
import { MyProfileInfo, SmallBill } from '.'
import { useNavigate } from 'react-router-dom'
import { Header, NavBar } from '../common'

export const MyProfileLike = () => {
  const navigate = useNavigate()
  const goToLike = () => {
    navigate('/profile/:id/profilelike')
  }
  const goToMyBill = () => {
    navigate('/profile/:id/profile')
  }

  return (
    <div className="pb-80">
      <Header type="profile" />
      <MyProfileInfo />
      <div className="desktop:px-60 pt-24">
        <div className="flex flex-row ml-20">
          <div
            onClick={goToMyBill}
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
              textPadding={15}
            />
            <div className="absolute top-10 left-12">
              <MiniBill fillColor="white" />
            </div>
          </div>
          <div
            onClick={goToLike}
            className="cursor-pointer relative flex">
            <MyProfileBillBtn
              type="submit"
              propsClass=""
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
        <div className="mx-20 border h-auto flex flex-wrap">
          <SmallBill/>
        </div>
      </div>
      <footer>
        <NavBar />
      </footer>
    </div>
  )
}
